import { Component, OnInit } from '@angular/core';
import { BaseDialogComponent } from '../base-dialog.component';
import {
  IActionButtonDialog,
  ICloseDialog,
  IImage,
} from '@app/data/interfaces/interface';
import { CommonService } from '@app/shared/services/common.service';
import { FileUploadHandlerEvent } from 'primeng/fileupload';
import { STATUS_RESPONSE } from '@app/shared/constants/app.const';
import { ToastService } from '@app/shared/services/toast.service';

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

  constructor(
    private commonService: CommonService,
    private toastService: ToastService
  ) {
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
    this.dynamicDialogRef.close();
  };

  public onClickSaveDialog = () => {
    if (this.fileImageUrl && this.fileImageUrl.length) {
      this.dynamicDialogRef.close({
        status: true,
        data: {
          urlImage: this.fileImageUrl,
        },
      } as ICloseDialog);
    } else {
      this.dynamicDialogRef.close();
    }
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

  public onRemoveImage(event: any) {
    if (event) {
      this.fileImageUrl = '';
    }
  }

  public get selectedImage() {
    return {
      src: this.fileImageUrl,
      width: '200px',
      height: '200px',
    } as IImage;
  }
}
