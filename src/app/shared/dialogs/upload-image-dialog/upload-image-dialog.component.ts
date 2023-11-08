import { Component, OnInit } from '@angular/core';
import { BaseDialogComponent } from '../base-dialog.component';
import { IActionButtonDialog } from '@app/data/interfaces/interface';
import { CommonService } from '@app/shared/services/common.service';
import { FileUploadHandlerEvent } from 'primeng/fileupload';
import { STATUS_RESPONSE } from '@app/shared/constants/app.const';
import { ToastService } from '@app/shared/services/toast.service';
import { DynamicEnvironmentService } from '@app/core/services/configure/dynamic-environment.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

export const DEFAULT_MAX_FILE_SIZE = 100000000;

@Component({
  selector: 'emir-upload-image-dialog',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.scss'],
})
export class UploadImageDialogComponent
  extends BaseDialogComponent
  implements OnInit
{
  public listAction: IActionButtonDialog[] = [];
  public classContainer = String('');
  public isImage = Boolean(false);
  public maxFileSize: number = DEFAULT_MAX_FILE_SIZE;
  public fileImageUrl = String('');
  public BASE_URL = String('');

  constructor(
    private commonService: CommonService,
    private toastService: ToastService,
    private dynamicEnvironmentService: DynamicEnvironmentService
  ) {
    super();
    this.BASE_URL = this.dynamicEnvironmentService.getConfig().baseAPIUrl;
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
    this.dynamicDialogRef.close();
  };

  public onClickSaveDialog = () => {
    console.log('onClickSaveDialog');
  };

  public get accept() {
    return this.isImage ? 'image/*' : 'image/*,video/mp4,video/x-m4v,video/*';
  }

  public onUpload(event: FileUploadHandlerEvent) {
    if (event) {
      this.commonService.uploadFileGetUrl(event.files[0], 'media').subscribe(
        (res) => {
          if (res.status === STATUS_RESPONSE.SUCCESS) {
            this.toastService.showToastSucess('Tải ảnh lên thành công');
            this.fileImageUrl = res.data;
          }
        },
        (error) => {
          this.toastService.showToastError('Có lỗi khi tải ảnh lên');
        }
      );
    }
  }

  public get backgroundImage() {
    console.log(5555, `url(${this.BASE_URL}/${this.fileImageUrl})`);
    return `url(${this.BASE_URL}/${this.fileImageUrl})`;
  }
}
