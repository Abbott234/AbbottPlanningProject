import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as fileSaver from 'file-saver';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NotifyService } from './notify.service';
import { StatusService } from './status.service';
import { environment } from '../../environments/environment';

interface IApiBufferReq {
    uri: string;
    call: Subscription;
}

export interface IApiRequestOptions {
    uri: string;
    params?: any;
    withCredentials?: boolean;
    token?: string;
    allowConcurrent?: boolean;
    showBusy?: boolean;
    hideError?: boolean;
}

@Injectable()
export class ApiService {
    private bufferGets: IApiBufferReq[] = [];
    private bufferDeletes: IApiBufferReq[] = [];
    private bufferPosts: IApiBufferReq[] = [];
    private bufferDownloads: IApiBufferReq[] = [];
    private apiPath = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private notify: NotifyService,
        private status: StatusService) { }

    async get<T>(req: IApiRequestOptions) {
        let call = () => this.http.get<T>(this.apiPath + req.uri, this.getHttpOptions(req));
        return await this.apiRequest(req, call, this.bufferGets);
    }

    async getTFS<T>(req: IApiRequestOptions) {
        let call = () => this.http.get<T>(req.uri, this.getTFSHttpOptions(req, true));
        return await this.apiRequest(req, call, this.bufferGets);
    }

    async delete(req: IApiRequestOptions) {
        let call = () => this.http.delete(this.apiPath + req.uri, this.getHttpOptions(req));
        return await this.apiRequest(req, call, this.bufferDeletes);
    }

    async postTFS<T>(req: IApiRequestOptions, data: any) {
        let call = () => this.http.post<T>(req.uri, data, this.getTFSHttpOptions(req, true));
        return await this.apiRequest(req, call, this.bufferPosts);
    }

    async post<T>(req: IApiRequestOptions, data: any) {
        let call = () => this.http.post<T>(this.apiPath + req.uri, data, this.getHttpOptions(req));
        return await this.apiRequest(req, call, this.bufferPosts);
    }

    async download(req: IApiRequestOptions) {
        let options = this.getHttpOptions(req) as any;
        options.observe = 'response';
        options.responseType = 'blob';
        let call = () => this.http.get(this.apiPath + req.uri, options);
        let res: any = await this.apiRequest(req, call, this.bufferDownloads);
        let fileName = res.headers.get('Content-Disposition').split(';')[1].split('=')[1];
        fileSaver.saveAs(res.body, fileName);
    }


    private getHttpOptions(req: IApiRequestOptions) {
        return {
            params: req.params,
            withCredentials: true
        };
    }
    private getTFSHttpOptions(req: IApiRequestOptions, cacheBust = false) {
        if (!req.params) {
            req.params = {};
        }

        if (cacheBust) {
            req.params.cacheBuster = Math.random().toString().substr(2);
        }

        let options = {
            params: req.params,
            withCredentials: req.withCredentials,
            headers: req.token ? new HttpHeaders({'Authorization': 'Basic ' + req.token}) : null
        };
        return options;
    }


    private async apiRequest<T>(req: IApiRequestOptions, apiCall: () => Observable<T>, buffers: IApiBufferReq[]) {
        if (req.showBusy) {
            this.status.setLoading(true, 'start ' + req.uri);
        }

        try {
            if (req.allowConcurrent) {
                return await new Promise((resolve, reject) => {
                    apiCall().pipe(finalize(() => {
                        if (req.showBusy) {
                            this.status.setLoading(false, 'end ' + req.uri);
                        }
                    })).subscribe((value) => resolve(value), (err => reject(err)));
                }) as T;
            }

            let bufferReq = buffers.find(get => get.uri === req.uri.toLowerCase().trim());

            if (!bufferReq) {
                bufferReq = {
                    uri: req.uri.toLowerCase().trim(),
                    call: null
                };

                buffers.push(bufferReq);
            } else if (!bufferReq.call.closed) {
                bufferReq.call.unsubscribe();

                if (req.showBusy) {
                    this.status.setLoading(false, 'cancel ' + req.uri);
                }
            }

            return await new Promise((resolve, reject) => {
                bufferReq.call = apiCall().pipe(finalize(() => {
                    if (req.showBusy) {
                        this.status.setLoading(false, 'end ' + req.uri);
                    }
                })).subscribe((value) => resolve(value), (err => reject(err)));
            }) as T;
        } catch (err) {
            if (!req.hideError) {
                this.notify.error('Unexpected Error Occured While Retrieving Data');
            }
            return Promise.reject(err);
        }
    }
}
