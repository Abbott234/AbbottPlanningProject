import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NavigationService, StatusService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(
      public status: StatusService,  
      public router: Router,
      public nav: NavigationService
  ) { }

  async ngOnInit() {
      this.router.events.subscribe(e => {
          this.status.setLoading(e instanceof NavigationStart);
      });
  }
}
