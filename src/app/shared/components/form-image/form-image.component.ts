import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { IImage } from '@app/data/interfaces/interface';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '@app/shared/constants/app.const';

@Component({
  selector: 'emir-form-image',
  templateUrl: './form-image.component.html',
  styleUrls: ['./form-image.component.scss'],
})
export class FormImageComponent implements OnInit {
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
  public isDisabled = Boolean(false);
  public baseUrl = String('');
  @Input()
  public maxFileSize = Number(0);
  @Input()
  public showBtnRemove = Boolean(false);
  @Input()
  public singleFile = Boolean(true);
  @Output()
  public _onChange: EventEmitter<IImage | undefined> = new EventEmitter<
    IImage | undefined
  >();
  @Output()
  public _onRemove: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dialogService: DialogService) {}

  ngOnInit() {
    // this.baseUrl = AppConsts.remoteServiceBaseUrl;
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
    if (event && !this.isDisabled) {
      // const ref = this.dialogService.open(UploadImageComponent, {
      //   data: {
      //     showOrder: false,
      //     isImage: true,
      //     maxFileSize: this.maxFileSize,
      //     singleFile: this.singleFile,
      //   },
      //   header: 'Chèn hình ảnh',
      //   width: '600px',
      //   footer: '',
      // });
      // ref.onClose.subscribe((images) => {
      //   if (images) {
      //     let imagesUrl = '';
      //     images?.forEach((image) => {
      //       imagesUrl += `${this.baseUrl}/${image.data}`;
      //     });
      //     this.src = `${this.baseUrl}/${
      //       images && images.length ? images[0].data : ''
      //     }`;
      //     this.width = this.widthLimit || DEFAULT_WIDTH;
      //     this.height = this.height || DEFAULT_HEIGHT;
      //     this._onChange.emit({
      //       src: this.src,
      //       width: this.width,
      //       height: this.height,
      //     } as IImage);
      //   }
      // });
    }
  }

  public get widthDiv() {
    return typeof this.width === 'number' ? this.width + 'px' : this.width;
  }

  public get heightDiv() {
    return typeof this.height === 'number' ? this.height + 'px' : this.height;
  }

  public remove(event: any) {
    if (event && !this.isDisabled) {
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
