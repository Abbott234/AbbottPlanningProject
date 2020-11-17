import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Injectable()
export class NavigationService {
    sideNavOpen = false;

    pageHeaderTitle: string;
    pageHeaderInfo: string;

    constructor(
        private router: Router
    ) {
        router.events.subscribe(e => {
            let navStart = e instanceof NavigationStart;

            if (!navStart) {
                this.sideNavOpen = false;
            }
        });
    }
}
