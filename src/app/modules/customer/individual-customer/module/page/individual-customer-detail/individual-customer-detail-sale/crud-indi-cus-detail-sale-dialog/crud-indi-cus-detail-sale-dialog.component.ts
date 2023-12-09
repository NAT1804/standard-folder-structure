import { Component, OnInit } from '@angular/core';
import {
  IActionButtonDialog,
  ICloseDialog,
} from '@app/data/interfaces/interface';
import { CrudIndiCusDetailSaleModel } from '@app/modules/customer/individual-customer/model/CrudIndiCusDetailSale.model';
import { IndividualCustomerService } from '@app/modules/customer/individual-customer/service/individual-customer.service';
import { SEVERITY, TYPE_INPUT } from '@app/shared/constants/app.const';
import { BaseDialogComponent } from '@app/shared/dialogs/base-dialog.component';

@Component({
  selector: 'ecore-crud-indi-cus-detail-sale-dialog',
  templateUrl: './crud-indi-cus-detail-sale-dialog.component.html',
  styleUrls: ['./crud-indi-cus-detail-sale-dialog.component.scss'],
})
export class CrudIndiCusDetailSaleDialogComponent
  extends BaseDialogComponent
  implements OnInit
{
  public listAction: IActionButtonDialog[] = [];
  public dataSource: CrudIndiCusDetailSaleModel =
    new CrudIndiCusDetailSaleModel();
  public referralCode = String('');

  public get TYPE_INPUT() {
    return TYPE_INPUT;
  }

  constructor(private individualCustomerService: IndividualCustomerService) {
    super();
  }

  ngOnInit() {
    this.listAction = [
      {
        label: 'Đóng',
        icon: 'pi pi-times',
        styleClassButton: SEVERITY.DANGER,
        callBack: this.onClickCloseDialog,
      },
      {
        label: 'Lưu',
        icon: 'pi pi-save',
        callBack: this.onClickSaveDialog,
      },
    ];

    if (this.dynamicDialogConfig.data) {
      if (this.dynamicDialogConfig.data.customerId) {
        this.dataSource.customerId = this.dynamicDialogConfig.data.customerId;
      }
      if (this.dynamicDialogConfig.data.dataSource) {
        this.dataSource.mapDTO(this.dynamicDialogConfig.data.dataSource);
      }
    }
  }

  public onClickCloseDialog = () => {
    this.dynamicDialogRef.close();
  };

  public onClickSaveDialog = () => {
    this.isSubmit = true;
    if (this.dataSource.isValidData()) {
      this.spinnerService.showSpinner();
      this.individualCustomerService
        .createOrEditIndiCusDetailSale(this.dataSource.toObjectSendToAPI())
        .subscribe(
          (response) => {
            this.spinnerService.removeSpinner();
            if (this.handleResponse(response)) {
              this.dynamicDialogRef.close({
                status: true,
              } as ICloseDialog);
            }
          },
          (error) => {
            this.spinnerService.removeSpinner();
          }
        );
    }
  };

  public isValidData(key: string) {
    return this.dataSource.showValidateData(key);
  }

  public onClickSearch(event: any) {
    if (event) {
      if (this.referralCode && this.referralCode.length) {
        this.individualCustomerService
          .verifySale(this.referralCode)
          .subscribe((response: any) => {
            if (this.handleResponse(response)) {
              this.toastService.showToastSucess(response.message);
              this.dataSource.code = response.data.saler_code;
              this.dataSource.name = response.data.saler_name;
              this.dataSource.phone = response.data.saler_phone;
              this.dataSource.organization = response.data.saler_department;
            }
          });
      } else {
        this.toastService.showToastWarning('Vui lòng nhập tìm kiếm!');
      }
    }
  }
}
