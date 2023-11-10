import { Component, OnInit } from '@angular/core';
import { IActionButtonDialog } from '@app/data/interfaces/interface';
import { BaseDialogComponent } from '@app/shared/dialogs/base-dialog.component';
import { CreateBusinessCustomerModel } from '../../../model/CreateBusinessCustomer.model';
import { scrollToError } from '@app/shared/function-common';

@Component({
  selector: 'ecore-create-business-customer-dialog',
  templateUrl: './create-business-customer-dialog.component.html',
  styleUrls: ['./create-business-customer-dialog.component.scss'],
})
export class CreateBusinessCustomerDialogComponent
  extends BaseDialogComponent
  implements OnInit
{
  public listAction: IActionButtonDialog[] = [];
  public dataSource: CreateBusinessCustomerModel =
    new CreateBusinessCustomerModel();

  constructor() {
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
  }

  public onClickCloseDialog = () => {
    console.log('onClickCloseDialog');
  };

  public onClickSaveDialog = () => {
    this.isSubmit = true;
    if (this.dataSource.isValidData()) {
      console.log('onClickSaveDialog');
    } else {
      scrollToError();
    }
  };

  public isValidData(key: string) {
    return this.dataSource.showValidateData(key);
  }
}
