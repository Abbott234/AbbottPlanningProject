import { Component, OnInit } from '@angular/core';
import { TFSService } from '../../services'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private api: TFSService
  ) { }

  ngOnInit() {
    // password expires on 1/24/2021
    this.api.login('awang', 'auiwu7pppio5pke6x3vqifs3vkwflueu2f5wmti6ziweinpngssa').then(r => {
      this.api.loadWorkItems();
    });

  }

}
