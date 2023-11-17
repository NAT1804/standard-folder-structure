import { Component, OnInit } from '@angular/core';
import {
  IActionButtonDialog,
  ICloseDialog,
  IImage,
} from '@app/data/interfaces/interface';
import {
  I_ADD_IMAGE_BG,
  SEVERITY,
  STATUS_RESPONSE,
} from '@app/shared/constants/app.const';
import { BaseDialogComponent } from '@app/shared/dialogs/base-dialog.component';
import { scrollToError } from '@app/shared/function-common';
import { CreateBusinessCustomerModel } from '../../../model/CreateBusinessCustomer.model';
import { BusinessCustomerService } from '../../../service/business-customer.service';

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
  public avatarIImage: IImage = I_ADD_IMAGE_BG;

  constructor(private businessCustomerService: BusinessCustomerService) {
    super();
  }

  ngOnInit() {
    this.listAction = [
      {
        label: 'Đóng',
        icon: 'pi pi-times',
        typeClassButton: SEVERITY.DANGER,
        callBack: this.onClickCloseDialog,
      },
      {
        label: 'Lưu',
        icon: 'pi pi-save',
        callBack: this.onClickSaveDialog,
      },
    ];
  }

  public onClickCloseDialog = () => {
    this.dynamicDialogRef.close();
  };

  public onClickSaveDialog = () => {
    this.isSubmit = true;
    if (this.dataSource.isValidData()) {
      this.businessCustomerService
        .createOrEditBusinessCustomer(this.dataSource.toObjectSendToAPI())
        .subscribe((response) => {
          if (response.status === STATUS_RESPONSE.SUCCESS) {
            this.dynamicDialogRef.close({
              status: true,
            } as ICloseDialog);
          }
        });
    } else {
      scrollToError();
    }
  };

  public isValidData(key: string) {
    return this.dataSource.showValidateData(key);
  }

  public onChangeAvatar(event: IImage | undefined) {
    if (event) {
      this.avatarIImage = event;
      this.dataSource.avatar = event.src;
    }
  }

  public onRemoveAvatar(event: any) {
    if (event) {
      this.avatarIImage = I_ADD_IMAGE_BG;
      this.dataSource.avatar = '';
    }
  }
}
