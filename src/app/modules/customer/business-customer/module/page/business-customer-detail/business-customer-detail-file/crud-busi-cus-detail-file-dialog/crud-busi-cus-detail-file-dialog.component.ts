import { Component, OnInit } from '@angular/core';
import {
  IActionButtonDialog,
  ICloseDialog,
} from '@app/data/interfaces/interface';
import { CrudBusiCusDetailFileModel } from '@app/modules/customer/business-customer/model/CrudBusiCusDetailFile.model';
import { BusinessCustomerService } from '@app/modules/customer/business-customer/service/business-customer.service';
import { SEVERITY, STATUS_RESPONSE } from '@app/shared/constants/app.const';
import { BaseDialogComponent } from '@app/shared/dialogs/base-dialog.component';
import { FileUploadHandlerEvent } from 'primeng/fileupload';

@Component({
  selector: 'ecore-crud-busi-cus-detail-file-dialog',
  templateUrl: './crud-busi-cus-detail-file-dialog.component.html',
  styleUrls: ['./crud-busi-cus-detail-file-dialog.component.scss'],
})
export class CrudBusiCusDetailFileDialogComponent
  extends BaseDialogComponent
  implements OnInit
{
  public listAction: IActionButtonDialog[] = [];
  public dataSource: CrudBusiCusDetailFileModel =
    new CrudBusiCusDetailFileModel();

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
      this.businessCustomerService
        .createOrEditBusiCusDetailFile(this.dataSource.toObjectSendToAPI())
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

  public upload(event: FileUploadHandlerEvent | undefined) {
    if (event && event.files && event.files.length && event.files[0]) {
      const file = event.files[0];
      this.apiConstantService
        .uploadFileGetUrl(file, 'business-customer-detail-file')
        .subscribe(
          (res) => {
            if (res.status === STATUS_RESPONSE.SUCCESS) {
              this.toastService.showToastSucess('Tải file lên thành công');
              this.dataSource.fileSrc = res.data;
            }
          },
          (error) => {
            this.toastService.showToastError('Có lỗi khi tải file lên');
          }
        );
    }
  }
}
