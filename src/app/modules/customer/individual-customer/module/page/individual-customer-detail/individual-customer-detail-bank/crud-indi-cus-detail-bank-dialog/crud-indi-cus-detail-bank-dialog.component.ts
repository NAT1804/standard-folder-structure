import { Component, OnInit } from '@angular/core';
import {
  IActionButtonDialog,
  ICloseDialog,
} from '@app/data/interfaces/interface';
import { CrudIndiCusDetailBankModel } from '@app/modules/customer/individual-customer/model/CrudIndiCusDetailBank.model';
import { IndividualCustomerService } from '@app/modules/customer/individual-customer/service/individual-customer.service';
import { STATUS_RESPONSE } from '@app/shared/constants/app.const';
import { BaseDialogComponent } from '@app/shared/dialogs/base-dialog.component';

@Component({
  selector: 'ecore-crud-indi-cus-detail-bank-dialog',
  templateUrl: './crud-indi-cus-detail-bank-dialog.component.html',
  styleUrls: ['./crud-indi-cus-detail-bank-dialog.component.scss'],
})
export class CrudIndiCusDetailBankDialogComponent
  extends BaseDialogComponent
  implements OnInit
{
  public listAction: IActionButtonDialog[] = [];
  public dataSource: CrudIndiCusDetailBankModel =
    new CrudIndiCusDetailBankModel();

  constructor(private individualCustomerService: IndividualCustomerService) {
    super();
  }

  ngOnInit() {
    this.listAction = [
      {
        label: 'Đóng',
        callBack: this.onClickCloseDialog,
      },
      {
        label: 'Lưu',
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
      this.individualCustomerService
        .createOrEditIndiCusDetailBank(this.dataSource.toObjectSendToAPI())
        .subscribe((response) => {
          if (response.status === STATUS_RESPONSE.SUCCESS) {
            this.dynamicDialogRef.close({
              status: true,
            } as ICloseDialog);
          }
        });
    }
  };

  public isValidData(key: string) {
    return this.dataSource.showValidateData(key);
  }
}
