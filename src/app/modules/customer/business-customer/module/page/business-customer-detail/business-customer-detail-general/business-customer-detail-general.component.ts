import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/modules/base-component/base-component.component';

@Component({
  selector: 'ecore-business-customer-detail-general',
  templateUrl: './business-customer-detail-general.component.html',
  styleUrls: ['./business-customer-detail-general.component.scss'],
})
export class BusinessCustomerDetailGeneralComponent
  extends BaseComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit() {
    console.log(1111);
  }
}
