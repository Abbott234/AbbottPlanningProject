import { Component, OnInit } from '@angular/core';
import { NavigationService, StatusService } from '../../../services';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  showLoading: boolean;

  constructor(
    public nav: NavigationService,
    public status: StatusService

  ) { }

  ngOnInit() {
    this.status.loading.subscribe(this, loading => setTimeout(() => this.showLoading = loading));
  }

}
