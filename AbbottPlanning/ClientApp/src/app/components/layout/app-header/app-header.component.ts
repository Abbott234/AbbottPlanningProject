import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../services';
@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  constructor(
    public nav: NavigationService
  ) { }

  ngOnInit() {
  }

}
