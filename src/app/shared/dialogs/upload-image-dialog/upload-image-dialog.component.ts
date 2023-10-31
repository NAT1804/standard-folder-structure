import { Component, OnInit } from '@angular/core';
import { BaseDialogComponent } from '../base-dialog.component';
import { IActionButtonDialog } from '@app/data/interfaces/interface';

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
    console.log('onClickSaveDialog');
  };

  public get accept() {
    return this.isImage ? 'image/*' : 'image/*,video/mp4,video/x-m4v,video/*';
  }

  public onUpload(event: any) {
    if (event) {
      console.log(1111);
    }
  }
}
