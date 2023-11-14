import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';
import { FileUploadHandlerEvent } from 'primeng/fileupload';

@Component({
  selector: 'emir-form-upload-file',
  templateUrl: './form-upload-file.component.html',
  styleUrls: ['./form-upload-file.component.scss'],
})
export class FormUploadFileComponent
  extends BaseCommonComponent
  implements OnInit
{
  @Input()
  public classFileUpload = String('');
  @Input()
  public type: string;
  @Input()
  public icon = String('pi pi-upload');
  @Input()
  public label = String('');
  @Input()
  public isDisabled = Boolean(false);
  @Output()
  public _onChange: EventEmitter<FileUploadHandlerEvent | undefined> =
    new EventEmitter<FileUploadHandlerEvent | undefined>();

  constructor() {
    super();
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  public handleUpload(event: FileUploadHandlerEvent) {
    if (event && event.files && event.files.length && event.files[0]) {
      this._onChange.emit(event);
    }
  }
}
