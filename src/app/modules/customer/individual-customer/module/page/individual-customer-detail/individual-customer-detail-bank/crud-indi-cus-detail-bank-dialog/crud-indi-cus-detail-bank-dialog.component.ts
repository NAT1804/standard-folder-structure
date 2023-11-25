import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  IActionButtonDialog,
  ICloseDialog,
  IDropdown,
} from '@app/data/interfaces/interface';
import { CrudIndiCusDetailBankModel } from '@app/modules/customer/individual-customer/model/CrudIndiCusDetailBank.model';
import { IndividualCustomerService } from '@app/modules/customer/individual-customer/service/individual-customer.service';
import { SEVERITY, TYPE_INPUT } from '@app/shared/constants/app.const';
import { BaseDialogComponent } from '@app/shared/dialogs/base-dialog.component';

@Component({
  selector: 'ecore-crud-indi-cus-detail-bank-dialog',
  templateUrl: './crud-indi-cus-detail-bank-dialog.component.html',
  styleUrls: ['./crud-indi-cus-detail-bank-dialog.component.scss'],
})
export class CrudIndiCusDetailBankDialogComponent
  extends BaseDialogComponent
  implements OnInit, AfterViewInit
{
  public listAction: IActionButtonDialog[] = [];
  public dataSource: CrudIndiCusDetailBankModel =
    new CrudIndiCusDetailBankModel();
  public listBank: IDropdown[] = [];

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
    this.apiConstantService.getListBank();

    if (this.dynamicDialogConfig.data) {
      if (this.dynamicDialogConfig.data.customerId) {
        this.dataSource.customerId = this.dynamicDialogConfig.data.customerId;
      }
      if (this.dynamicDialogConfig.data.dataSource) {
        this.dataSource.mapDTO(this.dynamicDialogConfig.data.dataSource);
      }
    }
  }

  ngAfterViewInit(): void {
    this.apiConstantService._listBank$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listBank = res;
        }
      }
    );
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
          if (this.handleResponse(response)) {
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
