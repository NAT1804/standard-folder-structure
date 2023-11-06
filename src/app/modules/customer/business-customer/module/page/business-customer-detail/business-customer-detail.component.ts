import { Component, OnInit } from '@angular/core';
import { ITabView } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { BusinessCustomerDetailGeneralComponent } from './business-customer-detail-general/business-customer-detail-general.component';

@Component({
  selector: 'ecore-business-customer-detail',
  templateUrl: './business-customer-detail.component.html',
  styleUrls: ['./business-customer-detail.component.scss'],
})
export class BusinessCustomerDetailComponent
  extends BaseComponent
  implements OnInit
{
  public activeIndex = Number(0);
  public listTabPanel: ITabView[] = [];

  constructor() {
    super();
  }

  ngOnInit() {
    this.getListTabPanel();
  }

  private getListTabPanel() {
    const listTabPanel: ITabView[] = [];

    listTabPanel.push({
      key: 'overview',
      title: 'Thông tin chung',
      component: BusinessCustomerDetailGeneralComponent,
      isDisabled: false,
    });

    this.listTabPanel = listTabPanel;
  }
}
