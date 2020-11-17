import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { ReplaySubject, Subject, Subscription } from 'rxjs';

interface IWatchSubscription {
    watcher: object;
    subscription: Subscription;
}

export class Watch<T> {
    private lastValue: T;
    private subscriptions = new Array<IWatchSubscription>();

    constructor(private subject: Subject<T>) {}

    subscribe(watcher: object, onNext: (value: T) => void) {
        this.unsubscribe(watcher);

        this.subscriptions.push({
            watcher: watcher,
            subscription: this.subject.subscribe(onNext.bind(watcher))
        });
    }

    unsubscribe(watcher: object) {
        let existingSub = _.find(this.subscriptions, s => s.watcher === watcher);

        if (existingSub) {
            existingSub.subscription.unsubscribe();
            _.pull(this.subscriptions, existingSub);
        }
    }

    next(value: T) {
        this.lastValue = value;
        this.subject.next(value);
    }

    last() {
        return this.lastValue;
    }

    getSubject() {
        return this.subject;
    }
}

@Injectable()
export class WatchService {
    get<T>(onlyNew?: boolean) {
        let subject = onlyNew ? new Subject<T>() : new ReplaySubject<T>(1);
        return new Watch<T>(subject);
    }
}
