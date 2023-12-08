import { Component, OnInit } from '@angular/core';
import {
  IActionButtonDialog,
  IDescriptionContent,
  IDropdown,
  IImage,
} from '@app/data/interfaces/interface';
import {
  I_ADD_IMAGE_BG,
  MARKDOWN_OPTIONS,
  SEVERITY,
} from '@app/shared/constants/app.const';
import { BaseDialogComponent } from '@app/shared/dialogs/base-dialog.component';
import { scrollToError } from '@app/shared/function-common';
import { CreateOrEditMediaImageModel } from '../../../model/CreateOrEditMediaImage.model';
import { MediaImageConst } from '../../../service/media-image.const';

@Component({
  selector: 'emir-crud-media-image-dialog',
  templateUrl: './crud-media-image-dialog.component.html',
  styleUrls: ['./crud-media-image-dialog.component.scss'],
})
export class CrudMediaImageDialogComponent
  extends BaseDialogComponent
  implements OnInit
{
  public listAction: IActionButtonDialog[] = [];
  public dataSource: CreateOrEditMediaImageModel =
    new CreateOrEditMediaImageModel();
  public imageIImage: IImage = I_ADD_IMAGE_BG;
  public listPage: IDropdown[] = [];
  public listPosition: IDropdown[] = [];
  public listOutstanding: IDropdown[] = [];
  public listRedirectType: IDropdown[] = [];
  public listRedirectLevel1: IDropdown[] = [];
  public listRedirectLevel2: IDropdown[] = [];
  public redirectButton = String('');

  constructor() {
    super();
  }

  ngOnInit() {
    console.log('ngOnInit');
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
  }

  public onClickCloseDialog = () => {
    this.dynamicDialogRef.close();
  };

  public onClickSaveDialog = () => {
    this.isSubmit = true;
    if (this.dataSource.isValidData()) {
      // this.individualCustomerService
      //   .createOrEditIndividualCustomer(this.dataSource.toObjectSendToAPI())
      //   .subscribe((response) => {
      //     if (this.handleResponse(response)) {
      //       this.dynamicDialogRef.close({
      //         status: true,
      //       } as ICloseDialog);
      //     }
      //   });
    } else {
      scrollToError();
    }
  };

  public isValidData(key: string) {
    return this.dataSource.showValidateData(key);
  }

  public get position() {
    return MediaImageConst.position;
  }

  public get redirectType() {
    return MediaImageConst.redirectType;
  }

  public get MARKDOWN_OPTIONS() {
    return MARKDOWN_OPTIONS;
  }

  public onChangeImage(event: IImage | undefined) {
    if (event) {
      this.imageIImage = event;
      this.dataSource.image = event.src;
    }
  }

  public onRemoveImage(event: any) {
    if (event) {
      this.imageIImage = I_ADD_IMAGE_BG;
      this.dataSource.image = '';
    }
  }

  public onChangeContent(event: IDescriptionContent | undefined) {
    if (event) {
      this.dataSource.content = event.content;
    }
  }

  public onChangeRedirectType(event: any) {
    if (event) {
      if (this.dataSource.redirectType === this.redirectType.TRONG_APP) {
        this.redirectButton = 'Giao dịch ngay';
      } else if (
        this.dataSource.redirectType === this.redirectType.LIEN_KET_KHAC
      ) {
        this.redirectButton = 'Khám phá ngay';
      }
    }
  }
}
