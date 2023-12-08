import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  IActionButtonDialog,
  ICloseDialog,
  IDescriptionContent,
  IDropdown,
  IImage,
} from '@app/data/interfaces/interface';
import {
  HEIGHT_DEFAULT_IMAGE,
  I_ADD_IMAGE_BG,
  MARKDOWN_OPTIONS,
  SEVERITY,
  WIDTH_DEFAULT_IMAGE,
} from '@app/shared/constants/app.const';
import { BaseDialogComponent } from '@app/shared/dialogs/base-dialog.component';
import { scrollToError } from '@app/shared/function-common';
import { CreateOrEditMediaImageModel } from '../../../model/CreateOrEditMediaImage.model';
import { MediaImageConst } from '../../../service/media-image.const';
import { MediaImageService } from '../../../service/media.service';

@Component({
  selector: 'emir-crud-media-image-dialog',
  templateUrl: './crud-media-image-dialog.component.html',
  styleUrls: ['./crud-media-image-dialog.component.scss'],
})
export class CrudMediaImageDialogComponent
  extends BaseDialogComponent
  implements OnInit, AfterViewInit
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

  constructor(private mediaImageService: MediaImageService) {
    super();
  }

  ngOnInit() {
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

    if (this.dynamicDialogConfig.data) {
      const { data } = this.dynamicDialogConfig;
      this.listPage = data.listPage;
      this.listOutstanding = data.listOutstanding;
      this.listRedirectType = data.listRedirectType;
      this.listRedirectLevel1 = data.listRedirectLevel1;
      if (data.dataSource) {
        this.dataSource.mapDTO(data.dataSource);
        if (this.dataSource.page)
          this.mediaImageService.getListPositionMediaImage(
            this.dataSource.page
          );
        if (this.dataSource.image && this.dataSource.image.length) {
          this.imageIImage = {
            src: this.dataSource.image,
            width: WIDTH_DEFAULT_IMAGE,
            height: HEIGHT_DEFAULT_IMAGE,
          };
        } else {
          this.imageIImage = I_ADD_IMAGE_BG;
        }
        if (this.dataSource.redirectLevel1)
          this.mediaImageService.getListRedirectLevel2(
            this.dataSource.redirectLevel1
          );
        this.getRedirectButton();
      }
    }
  }

  ngAfterViewInit(): void {
    this.mediaImageService._listPositionMediaImage$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listPosition = res;
        }
      }
    );
    this.mediaImageService._listRedirectLevel2$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listRedirectLevel2 = res;
        }
      }
    );
  }

  public onClickCloseDialog = () => {
    this.dynamicDialogRef.close();
  };

  public onClickSaveDialog = () => {
    this.isSubmit = true;
    if (this.dataSource.isValidData()) {
      this.mediaImageService
        .createOrEditMediaImage(this.dataSource.toObjectSendToAPI())
        .subscribe((response) => {
          if (this.handleResponse(response)) {
            this.dynamicDialogRef.close({
              status: true,
            } as ICloseDialog);
          }
        });
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

  public onChangePage(event: any) {
    if (event) {
      this.listPosition = [];
      this.dataSource.position = '';
      if (this.dataSource.page) {
        this.mediaImageService.getListPositionMediaImage(this.dataSource.page);
      }
    }
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

  public onChangeIsRedirect(event: any) {
    if (event) {
      if (!this.dataSource.isRedirect) {
        this.dataSource.redirectType = '';
        this.dataSource.redirectLevel1 = '';
        this.dataSource.redirectLevel2 = '';
        this.dataSource.redirectLink = '';
      }
    }
  }

  public onChangeRedirectType(event: any) {
    if (event) {
      this.getRedirectButton();
      if (this.dataSource.redirectType === this.redirectType.TRONG_APP) {
        this.dataSource.redirectLink = '';
      } else if (
        this.dataSource.redirectType === this.redirectType.LIEN_KET_KHAC
      ) {
        this.dataSource.redirectLevel1 = '';
        this.dataSource.redirectLevel2 = '';
      }
    }
  }

  private getRedirectButton() {
    if (this.dataSource.redirectType === this.redirectType.TRONG_APP) {
      this.redirectButton = 'Giao dịch ngay';
    } else if (
      this.dataSource.redirectType === this.redirectType.LIEN_KET_KHAC
    ) {
      this.redirectButton = 'Khám phá ngay';
    } else {
      this.redirectButton = '';
    }
  }

  public onChangeRedirectLevel1(event: any) {
    if (event) {
      this.listRedirectLevel2 = [];
      this.dataSource.redirectLevel2 = '';
      if (this.dataSource.redirectLevel1) {
        this.mediaImageService.getListRedirectLevel2(
          this.dataSource.redirectLevel1
        );
      }
    }
  }
}
