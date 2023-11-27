import { Component, OnInit } from '@angular/core';
import {
  IActionButtonDialog,
  ICloseDialog,
} from '@app/data/interfaces/interface';
import { CrudIndiCusDetailContactModel } from '@app/modules/customer/individual-customer/model/CrudIndiCusDetailContact.model';
import { IndividualCustomerService } from '@app/modules/customer/individual-customer/service/individual-customer.service';
import { SEVERITY } from '@app/shared/constants/app.const';
import { BaseDialogComponent } from '@app/shared/dialogs/base-dialog.component';

@Component({
  selector: 'ecore-crud-indi-cus-detail-contact-dialog',
  templateUrl: './crud-indi-cus-detail-contact-dialog.component.html',
  styleUrls: ['./crud-indi-cus-detail-contact-dialog.component.scss'],
})
export class CrudIndiCusDetailContactDialogComponent
  extends BaseDialogComponent
  implements OnInit
{
  public listAction: IActionButtonDialog[] = [];
  public dataSource: CrudIndiCusDetailContactModel =
    new CrudIndiCusDetailContactModel();

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
        .createOrEditIndiCusDetailContact(this.dataSource.toObjectSendToAPI())
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
}
