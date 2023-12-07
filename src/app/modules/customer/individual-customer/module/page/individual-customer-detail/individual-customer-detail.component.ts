import { Component, OnInit } from '@angular/core';
import { ITabView } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { IndividualCustomerConst } from '../../../service/individual-customer.const';
import { IndividualCustomerService } from '../../../service/individual-customer.service';
import { IndividualCustomerDetailBankComponent } from './individual-customer-detail-bank/individual-customer-detail-bank.component';
import { IndividualCustomerDetailContactComponent } from './individual-customer-detail-contact/individual-customer-detail-contact.component';
import { IndividualCustomerDetailGeneralComponent } from './individual-customer-detail-general/individual-customer-detail-general.component';
import { IndividualCustomerDetailSaleComponent } from './individual-customer-detail-sale/individual-customer-detail-sale.component';
import { IndividualCustomerDetailVerifyComponent } from './individual-customer-detail-verify/individual-customer-detail-verify.component';

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

  constructor(private individualCustomerService: IndividualCustomerService) {
    super();
  }

  ngOnInit() {
    this.individualCustomerService.individualCustomerId =
      this.routeActive.snapshot.paramMap.get('id') || undefined;
    this.individualCustomerService.individualCustomerApproveId =
      this.routeActive.snapshot.paramMap.get('approveId') || undefined;
    this.individualCustomerService.isApprove =
      this.routerService.getRouterInclude('/approve');
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

  public get tabDetailGeneral() {
    return IndividualCustomerConst.tabDetailGeneral;
  }

  public get isEdit() {
    return this.individualCustomerService.isEdit;
  }

  public onClickEdit(event: any) {
    if (event) {
      this.individualCustomerService.isEdit = true;
    }
  }

  public onClickSave(event: any) {
    if (event) {
      this.individualCustomerService._handleEventSave.next(true);
    }
  }

  public onClickBack(event: any) {
    if (event) {
      this.routerIncludeCustomer
        ? this.routerService.routerNavigate(['/customer/individual-customer'])
        : this.routerService.routerNavigate([
            '/approve/approve-individual-customer',
          ]);
    }
  }

  public get routerIncludeCustomer() {
    return this.routerService.getRouterInclude('/customer');
  }

  public get showBtnCheck() {
    return (
      this.individualCustomerService.isApprove &&
      this.individualCustomerService.showBtnCheck
    );
  }

  public onClickCheck(event: any) {
    if (event) {
      this.dialogCommonService.createConfirmDialog(
        'Vận hành kiểm tra',
        'Xác nhận vận hành kiểm tra khách hàng',
        () => {
          if (this.individualCustomerService.individualCustomerId) {
            this.individualCustomerService
              .checkCustomer(
                this.individualCustomerService.individualCustomerId
              )
              .subscribe((response) => {
                if (this.handleResponse(response)) {
                  this.toastService.showToastSucess(
                    'Vận hành kiểm tra thành công!'
                  );
                  this.individualCustomerService.showBtnCheck = false;
                }
              });
          }
        },
        () => {
          console.log('reject');
        }
      );
    }
  }
}
