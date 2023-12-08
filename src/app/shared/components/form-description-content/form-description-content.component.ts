import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  ICloseDialog,
  IDescriptionContent,
  ISelectButton,
} from '@app/data/interfaces/interface';
import {
  HTML_MARKDOWN_OPTIONS,
  MARKDOWN_OPTIONS,
} from '@app/shared/constants/app.const';
import { UploadImageDialogComponent } from '@app/shared/dialogs/upload-image-dialog/upload-image-dialog.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';

@Component({
  selector: 'emir-form-description-content',
  templateUrl: './form-description-content.component.html',
  styleUrls: ['./form-description-content.component.scss'],
})
export class FormDescriptionContentComponent
  extends BaseCommonComponent
  implements AfterViewInit
{
  @Input()
  public title = String('');
  @Input()
  public classTitle = String('');
  public htmlMarkdownOptions: ISelectButton[] = HTML_MARKDOWN_OPTIONS;
  @Input()
  public contentType = String('');
  @Input()
  public content: string | undefined = '';
  @Input()
  public isDisabled = Boolean(false);
  @Input()
  public showBtnInsertImage = Boolean(true);
  @Input()
  public classMarkdown = String('');
  @Input()
  public rowsTextarea = Number(10);
  @Input()
  public heightEditor = String('');
  private caretPos = Number(0);
  public baseUrl = String('');
  @Output()
  public _onChangeData: EventEmitter<IDescriptionContent | undefined> =
    new EventEmitter<IDescriptionContent | undefined>();
  private subjectChangeInput: Subject<any> = new Subject();

  constructor() {
    super();
  }

  public get MARKDOWN_OPTIONS() {
    return MARKDOWN_OPTIONS;
  }

  ngAfterViewInit() {
    this.subjectChangeInput.pipe(debounceTime(200)).subscribe((res) => {
      if (res) {
        this.emitData();
      }
    });
  }

  public getCaretPos(oField: any) {
    if (oField.selectionStart || oField.selectionStart == '0') {
      this.caretPos = oField.selectionStart;
    }
  }

  public insertImageContent(event: any) {
    if (event) {
      const modalRef = this.dialogCommonService.createDialog(
        UploadImageDialogComponent,
        '600px'
      );
      modalRef.onClose.subscribe((res: ICloseDialog) => {
        if (res?.status) {
          const oldContentValue = this.content || '';
          this.content =
            oldContentValue.slice(0, this.caretPos) + res.data.urlImage ||
            '' + oldContentValue.slice(this.caretPos);
          this.emitData();
        }
      });
    }
  }

  public get displayContent() {
    if (this.content) return this.content;
    return 'Nội dung hiển thị';
  }

  public onChangeContentType(event: any) {
    if (event) {
      this.emitData();
    }
  }

  public emitData() {
    this._onChangeData.emit({
      contentType: this.contentType,
      content: this.content,
    } as IDescriptionContent);
  }

  public handleInput(event: any) {
    this.subjectChangeInput.next(event);
  }
}
