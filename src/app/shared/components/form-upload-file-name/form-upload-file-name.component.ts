import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SEVERITY, STATUS_RESPONSE } from '@app/shared/constants/app.const';
import { FileUploadHandlerEvent } from 'primeng/fileupload';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';

@Component({
  selector: 'emir-form-upload-file-name',
  templateUrl: './form-upload-file-name.component.html',
  styleUrls: ['./form-upload-file-name.component.scss'],
})
export class FormUploadFileNameComponent extends BaseCommonComponent {
  @Input()
  public classContainer = String('');
  @Input()
  public labelName = String('Tên file');
  @Input()
  public labelSrc = String('File');
  @Input()
  public keyApiUpload = String('');
  @Input()
  public ngModelValue: UploadFileNameModel[] | any = undefined;
  @Output()
  public _onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public ngModelValueChange: EventEmitter<UploadFileNameModel[] | any | any> =
    new EventEmitter<UploadFileNameModel[] | any | any>();

  constructor() {
    super();
  }

  public onClickAdd(event: any) {
    if (event) {
      this.ngModelValue.push(new UploadFileNameModel());
      this.emitData(event);
    }
  }

  public onChangeName(event: any, index: number) {
    this.emitData(event);
  }

  public uploadFile(event: FileUploadHandlerEvent | undefined, index: number) {
    if (event && event.files && event.files.length && event.files[0]) {
      const file = event.files[0];
      this.apiConstantService
        .uploadFileGetUrl(file, this.keyApiUpload)
        .subscribe(
          (res) => {
            if (res.status === STATUS_RESPONSE.SUCCESS) {
              this.toastService.showToastSucess('Tải file lên thành công');
              this.ngModelValue[index].src = res.data;
              this.emitData(event);
            }
          },
          (error) => {
            this.toastService.showToastError('Có lỗi khi tải file lên');
          }
        );
    }
  }
  public onClickRemove(event: any, index: number) {
    if (event) {
      this.dialogCommonService.createConfirmDialog(
        'Xóa file',
        'Xác nhận xóa file',
        () => {
          if (
            this.ngModelValue &&
            this.ngModelValue.length === 1 &&
            index === 0
          ) {
            this.ngModelValue = [new UploadFileNameModel()];
          } else {
            this.ngModelValue.splice(index, 1);
          }
          this.emitData(event);
        },
        () => {
          console.log('reject');
        }
      );
    }
  }

  private emitData(event: any) {
    this.ngModelValueChange.emit(this.ngModelValue);
    this._onChange.emit(event);
  }

  public get SEVERITY() {
    return SEVERITY;
  }
}

export class UploadFileNameModel {
  id?: string;
  name = String('');
  src = String('');
}
