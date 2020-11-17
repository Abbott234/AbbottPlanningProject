import { Injectable } from "@angular/core";
import * as _ from 'lodash';
import { TFSSession, TFSCookie, TFSPath, TFSWorkItem } from '../models/tfs';
import { ApiService, IApiRequestOptions } from './api.service';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class TFSService { 
    private tfsApiVersion = "5.1";
    private tfsBaseUrl = "https://tfs.urbanscience.net/UrbanScience/";
    private session: TFSSession;
    private getWorkItemQueryId = "24642e76-2f65-43d0-93ee-f860d0bf9220"
    private TFS_COOKIE = 'TFSLogin';
    private tfsPaths: Array<TFSPath> = [
        new TFSPath('ApplicationSuite', '$/ApplicationSuite/INFORM')
    ];
    private readonly workItemCount = 200;
    public TFSWorkItems: TFSWorkItem[];

    constructor(private api: ApiService, private cookie: CookieService) {
    }

    login = async (userName: string, password: string) => {
        let token = btoa(userName.trim() + ":" + password.trim());
        this.session = new TFSSession(userName, token);
        this.cookie.putObject(this.TFS_COOKIE, new TFSCookie(userName, token), { expires: new Date(9999, 11, 31) });
        return await this.validateCredentials();
    }
    

    loadWorkItems = async () => {
        let calls = this.tfsPaths.map(path => this.api.getTFS<any>(this.getRequest(this.getWorkItemUrl(path))));
        let workItemIds = _(await Promise.all(calls)).map((wiEnv, i) => wiEnv.workItems.map(wi =>
            wi.id
        )).flatten().value();


        let postRep = this.tfsPaths.map(path => this.api.postTFS<any>(this.getRequest(this.getWorkItemBatchUrl(path)), 
            {
                ids: workItemIds,
                fields: [
                    'System.State',
                    'Microsoft.VSTS.Common.BusinessValue',
                    'System.Title',
                    'Microsoft.VSTS.Scheduling.Effort',
                    'System.Description',
                    'System.WorkItemType',
                    'System.AreaPath',
                    'System.IterationPath',
                    'System.CreatedBy'
                ]
            }
        ));
            
 
         let workItemObj = _(await Promise.all(postRep))     
         .map((wiEnv, i) => wiEnv.value.map(wi =>
            new TFSWorkItem(
              wi.id,
              wi.fields['System.Title'],
              wi.fields['Microsoft.VSTS.Scheduling.Effort'],
              wi.fields['Microsoft.VSTS.Common.BusinessValue'],
              wi.fields['System.State'],
              wi.fields['System.Description'],
              wi.fields['System.WorkItemType'],
              wi.fields['System.AreaPath'],
              wi.fields['System.IterationPath'],
              wi.fields['System.CreatedBy'].displayName,
              wi.url
            )
          ))
          .flatten()
          .uniqBy('id')
          .orderBy(wi => wi.businessValue)
          .orderBy(wi => wi.effort)
          .take(this.workItemCount)
          .value();         

        this.TFSWorkItems = workItemObj;
    }

    private getProjectUrl(): string {
        return this.tfsBaseUrl + "_apis/projects?api-version=" + this.tfsApiVersion;
      }

    private getWorkItemUrl(tfsPath: TFSPath): string {
        return this.tfsBaseUrl + tfsPath.tfsCollection + '/_apis/wit/wiql/' + this.getWorkItemQueryId + '?api-version=' + this.tfsApiVersion;
    }

    private getWorkItemBatchUrl(tfsPath: TFSPath): string {
        return this.tfsBaseUrl + tfsPath.tfsCollection + '/_apis/wit/workitemsbatch?api-version=' + this.tfsApiVersion;
    }

    private async validateCredentials() {
        let req = this.getRequest(this.getProjectUrl());
        req.hideError = false;
    
        try {
          let res = await this.api.getTFS<any>(req);
          return _.some(res.value, ['name', 'ApplicationSuite']);
        } catch {
          return false;
        }
      }

    private getRequest(uri: string): IApiRequestOptions {
        return {
          uri: uri,
          token: this.session.token,
          allowConcurrent: true,
          showBusy: true
        };
    }

}