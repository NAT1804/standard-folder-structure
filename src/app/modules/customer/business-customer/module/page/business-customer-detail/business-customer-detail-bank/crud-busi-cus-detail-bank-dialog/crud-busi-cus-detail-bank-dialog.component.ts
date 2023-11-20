import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  IActionButtonDialog,
  ICloseDialog,
  IDropdown,
} from '@app/data/interfaces/interface';
import { CrudBusiCusDetailBankModel } from '@app/modules/customer/business-customer/model/CrudBusiCusDetailBank.model';
import { BusinessCustomerService } from '@app/modules/customer/business-customer/service/business-customer.service';
import {
  SEVERITY,
  STATUS_RESPONSE,
  TYPE_INPUT,
} from '@app/shared/constants/app.const';
import { BaseDialogComponent } from '@app/shared/dialogs/base-dialog.component';

@Component({
  selector: 'ecore-crud-busi-cus-detail-bank-dialog',
  templateUrl: './crud-busi-cus-detail-bank-dialog.component.html',
  styleUrls: ['./crud-busi-cus-detail-bank-dialog.component.scss'],
})
export class CrudBusiCusDetailBankDialogComponent
  extends BaseDialogComponent
  implements OnInit, AfterViewInit
{
  public listAction: IActionButtonDialog[] = [];
  public dataSource: CrudBusiCusDetailBankModel =
    new CrudBusiCusDetailBankModel();
  public listBank: IDropdown[] = [];

  public get TYPE_INPUT() {
    return TYPE_INPUT;
  }

  constructor(private businessCustomerService: BusinessCustomerService) {
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
      this.businessCustomerService
        .createOrEditBusiCusDetailBank(this.dataSource.toObjectSendToAPI())
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
