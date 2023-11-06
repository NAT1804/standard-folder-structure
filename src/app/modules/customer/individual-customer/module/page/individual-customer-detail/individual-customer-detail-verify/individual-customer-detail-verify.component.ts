import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/modules/base-component/base-component.component';

@Component({
  selector: 'ecore-individual-customer-detail-verify',
  templateUrl: './individual-customer-detail-verify.component.html',
  styleUrls: ['./individual-customer-detail-verify.component.scss'],
})
export class IndividualCustomerDetailVerifyComponent
  extends BaseComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit() {
    console.log('ngOnInit');
  }
}
