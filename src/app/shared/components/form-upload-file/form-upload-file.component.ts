import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SEVERITY } from '@app/shared/constants/app.const';
import { FileUploadHandlerEvent } from 'primeng/fileupload';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';

@Component({
  selector: 'emir-form-upload-file',
  templateUrl: './form-upload-file.component.html',
  styleUrls: ['./form-upload-file.component.scss'],
})
export class FormUploadFileComponent extends BaseCommonComponent {
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
  @Input()
  public severityButton = String(SEVERITY.PRIMARY);
  @Input()
  public styleClass = String('');
  @Output()
  public _onChange: EventEmitter<FileUploadHandlerEvent | undefined> =
    new EventEmitter<FileUploadHandlerEvent | undefined>();

  constructor() {
    super();
  }

  public handleUpload(event: FileUploadHandlerEvent) {
    if (event && event.files && event.files.length && event.files[0]) {
      this._onChange.emit(event);
    }
  }

  public get severityClass() {
    return `p-button-${this.severityButton}`;
  }
}
