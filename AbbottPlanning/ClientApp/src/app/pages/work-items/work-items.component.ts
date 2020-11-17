import { Component, OnInit } from '@angular/core';
import { TFSService } from '../../services';
import { TFSWorkItem } from '../../models/tfs';

@Component({
  selector: 'app-work-items',
  templateUrl: './work-items.component.html',
  styleUrls: ['./work-items.component.scss']
})
export class WorkItemsComponent implements OnInit {

  workItems: TFSWorkItem[];

  constructor(
    public tfsApi: TFSService
  ) { }

  async ngOnInit() {

    await this.tfsApi.login('awang', 'auiwu7pppio5pke6x3vqifs3vkwflueu2f5wmti6ziweinpngssa');
    await this.tfsApi.loadWorkItems();
    this.workItems = this.tfsApi.TFSWorkItems;

  }

}
