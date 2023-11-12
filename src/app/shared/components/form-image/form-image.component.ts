import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ICloseDialog, IImage } from '@app/data/interfaces/interface';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '@app/shared/constants/app.const';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';
import { DialogCommonService } from '@app/shared/dialogs/dialog-common.service';
import { UploadImageDialogComponent } from '@app/shared/dialogs/upload-image-dialog/upload-image-dialog.component';

@Component({
  selector: 'emir-form-image',
  templateUrl: './form-image.component.html',
  styleUrls: ['./form-image.component.scss'],
})
export class FormImageComponent extends BaseCommonComponent implements OnInit {
  @Input()
  public classContainer = String('');
  @Input()
  public imageSource: IImage;
  @Input()
  public widthLimit: number = DEFAULT_WIDTH;
  @Input()
  public heightLimit: number = DEFAULT_HEIGHT;
  public src = String('');
  public width: number | string;
  public height: number | string;
  @Input()
  public classImage = String('');
  @Input()
  public isDisabled = Boolean(true);
  public baseUrl = String('');
  @Input()
  public maxFileSize = Number(0);
  @Input()
  public showBtnRemove = Boolean(true);
  @Input()
  public showBtnInsert = Boolean(true);
  @Input()
  public singleFile = Boolean(true);
  @Input()
  public preview = Boolean(true);
  @Output()
  public _onChange: EventEmitter<IImage | undefined> = new EventEmitter<
    IImage | undefined
  >();
  @Output()
  public _onRemove: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dialogCommonService: DialogCommonService) {
    super();
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.imageSource) {
      this.src = this.imageSource.src;
      this.width = this.imageSource.width || DEFAULT_WIDTH;
      this.height = this.imageSource.height || DEFAULT_HEIGHT;
    }
  }

  public insertImage(event: any) {
    if (event) {
      const modalRef = this.dialogCommonService.createDialog(
        UploadImageDialogComponent,
        '600px'
      );
      modalRef.onClose.subscribe((res: ICloseDialog) => {
        if (res?.status) {
          this.src = res.data.urlImage || '';
          this.width = this.widthLimit || DEFAULT_WIDTH;
          this.height = this.height || DEFAULT_HEIGHT;
          this._onChange.emit({
            src: this.src,
            width: this.width,
            height: this.height,
          } as IImage);
        }
      });
    }
  }

  public removeImage(event: any) {
    if (event) {
      this._onRemove.emit(event);
    }
  }

  public get widthImg() {
    return typeof this.width === 'number' ? this.width + 'px' : this.width;
  }

  public get heightImg() {
    return typeof this.height === 'number' ? this.height + 'px' : this.height;
  }
}
