import { Injectable } from '@angular/core';
import { WatchService, Watch } from './watch.service';

@Injectable()
export class StatusService {
    private taskCount = 0;

    public loading: Watch<boolean>;

    constructor(watch: WatchService) {
        this.loading = watch.get();
    }

    setLoading(loading: boolean, trace?: any) {
        if (!!trace) {
            //console.log(trace);
        }
        
        loading ? this.taskCount++ : this.taskCount--;
        this.taskCount = Math.max(0, this.taskCount);
        this.loading.next(this.taskCount > 0);
    }
}
