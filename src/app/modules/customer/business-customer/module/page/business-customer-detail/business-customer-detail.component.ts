import { Component, OnInit } from '@angular/core';
import { ITabView } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { MenuItem } from 'primeng/api';
import { BusinessCustomerConst } from '../../../service/business-customer.const';
import { BusinessCustomerService } from '../../../service/business-customer.service';
import { BusinessCustomerDetailBankComponent } from './business-customer-detail-bank/business-customer-detail-bank.component';
import { BusinessCustomerDetailFileComponent } from './business-customer-detail-file/business-customer-detail-file.component';
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

  constructor(private businessCustomerService: BusinessCustomerService) {
    super();
  }

  ngOnInit() {
    this.breadcrumbService.setItems([
      { label: 'Trang chủ', routerLink: ['/home'] },
      {
        label: this.routerIncludeCustomer
          ? 'Khách hàng'
          : 'Phê duyệt khách hàng',
      },
      {
        label: 'Khách hàng doanh nghiệp',
        routerLink: this.routerIncludeCustomer
          ? ['/customer/business-customer']
          : ['/approve/approve-individual-customer'],
      },
      { label: 'Chi tiết khách hàng doanh nghiệp' },
    ] as MenuItem[]);
    this.businessCustomerService.businessCustomerId =
      this.routeActive.snapshot.paramMap.get('id') || undefined;
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

    listTabPanel.push({
      key: 'bank',
      title: 'Tài khoản ngân hàng',
      component: BusinessCustomerDetailBankComponent,
      isDisabled: false,
    });

    listTabPanel.push({
      key: 'file',
      title: 'File tài liệu',
      component: BusinessCustomerDetailFileComponent,
      isDisabled: false,
    });

    this.listTabPanel = listTabPanel;
  }

  public get tabDetailGeneral() {
    return BusinessCustomerConst.tabDetailGeneral;
  }

  public get isEdit() {
    return this.businessCustomerService.isEdit;
  }

  public onClickEdit(event: any) {
    if (event) {
      this.businessCustomerService.isEdit = true;
    }
  }

  public onClickSave(event: any) {
    if (event) {
      this.businessCustomerService._handleEventSave.next(true);
    }
  }

  public onClickBack(event: any) {
    if (event) {
      this.routerIncludeCustomer
        ? this.routerService.routerNavigate(['/customer/business-customer'])
        : this.routerService.routerNavigate([
            '/approve/approve-business-customer',
          ]);
    }
  }

  public get routerIncludeCustomer() {
    return this.routerService.getRouterInclude('/customer');
  }
}
