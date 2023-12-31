import { Component, OnInit } from '@angular/core';
import { ITabView } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { IndividualCustomerDetailGeneralComponent } from './individual-customer-detail-general/individual-customer-detail-general.component';
import { IndividualCustomerDetailBankComponent } from './individual-customer-detail-bank/individual-customer-detail-bank.component';
import { IndividualCustomerDetailContactComponent } from './individual-customer-detail-contact/individual-customer-detail-contact.component';
import { IndividualCustomerDetailVerifyComponent } from './individual-customer-detail-verify/individual-customer-detail-verify.component';
import { IndividualCustomerDetailSaleComponent } from './individual-customer-detail-sale/individual-customer-detail-sale.component';

@Component({
  selector: 'ecore-individual-customer-detail',
  templateUrl: './individual-customer-detail.component.html',
  styleUrls: ['./individual-customer-detail.component.scss'],
})
export class IndividualCustomerDetailComponent
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
      component: IndividualCustomerDetailGeneralComponent,
      isDisabled: false,
    });

    listTabPanel.push({
      key: 'bank',
      title: 'Tài khoản ngân hàng',
      component: IndividualCustomerDetailBankComponent,
      isDisabled: false,
    });

    listTabPanel.push({
      key: 'contact',
      title: 'Địa chỉ liên hệ',
      component: IndividualCustomerDetailContactComponent,
      isDisabled: false,
    });

    listTabPanel.push({
      key: 'verify',
      title: 'Dữ liệu xác minh',
      component: IndividualCustomerDetailVerifyComponent,
      isDisabled: false,
    });

    listTabPanel.push({
      key: 'sale',
      title: 'Người tư vấn',
      component: IndividualCustomerDetailSaleComponent,
      isDisabled: false,
    });

    this.listTabPanel = listTabPanel;
  }
}
