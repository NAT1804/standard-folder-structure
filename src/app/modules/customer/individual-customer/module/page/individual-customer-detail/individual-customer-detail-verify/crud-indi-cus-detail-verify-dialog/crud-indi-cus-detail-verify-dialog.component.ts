import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  IActionButtonDialog,
  ICloseDialog,
  IDropdown,
  IImage,
} from '@app/data/interfaces/interface';
import { CrudIndiCusDetailVerifyModel } from '@app/modules/customer/individual-customer/model/CrudIndiCusDetailVerify.model';
import { IndividualCustomerService } from '@app/modules/customer/individual-customer/service/individual-customer.service';
import {
  HEIGHT_DEFAULT_IMAGE,
  I_ADD_IMAGE_BG,
  SEVERITY,
  WIDTH_DEFAULT_IMAGE,
} from '@app/shared/constants/app.const';
import { BaseDialogComponent } from '@app/shared/dialogs/base-dialog.component';

@Component({
  selector: 'ecore-crud-indi-cus-detail-verify-dialog',
  templateUrl: './crud-indi-cus-detail-verify-dialog.component.html',
  styleUrls: ['./crud-indi-cus-detail-verify-dialog.component.scss'],
})
export class CrudIndiCusDetailVerifyDialogComponent
  extends BaseDialogComponent
  implements OnInit, AfterViewInit
{
  public listAction: IActionButtonDialog[] = [];
  public dataSource: CrudIndiCusDetailVerifyModel =
    new CrudIndiCusDetailVerifyModel();
  public listTypeOfDocument: IDropdown[] = [];
  public frontImageIImage: IImage = I_ADD_IMAGE_BG;
  public backImageIImage: IImage = I_ADD_IMAGE_BG;

  constructor(private individualCustomerService: IndividualCustomerService) {
    super();
  }

  ngOnInit() {
    this.individualCustomerService.getListIdTypeIndividualCustomer();
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
      if (this.dynamicDialogConfig.data.customerId) {
        this.dataSource.customerId = this.dynamicDialogConfig.data.customerId;
      }
      if (this.dynamicDialogConfig.data.dataSource) {
        this.dataSource.mapDTO(this.dynamicDialogConfig.data.dataSource);
        if (this.dataSource.frontImage && this.dataSource.frontImage.length) {
          this.frontImageIImage = {
            src: this.dataSource.frontImage,
            width: WIDTH_DEFAULT_IMAGE,
            height: HEIGHT_DEFAULT_IMAGE,
          };
        }
        if (this.dataSource.backImage && this.dataSource.backImage.length) {
          this.backImageIImage = {
            src: this.dataSource.backImage,
            width: WIDTH_DEFAULT_IMAGE,
            height: HEIGHT_DEFAULT_IMAGE,
          };
        }
      }
    }
  }

  ngAfterViewInit(): void {
    this.individualCustomerService._listIdTypeIndividualCustomer$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listTypeOfDocument = res;
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
      this.spinnerService.showSpinner();
      this.individualCustomerService
        .createOrEditIndiCusDetailVerify(this.dataSource.toObjectSendToAPI())
        .subscribe(
          (response) => {
            this.spinnerService.removeSpinner();
            if (this.handleResponse(response)) {
              this.dynamicDialogRef.close({
                status: true,
              } as ICloseDialog);
            }
          },
          (error) => {
            this.spinnerService.removeSpinner();
          }
        );
    }
  };

  public isValidData(key: string) {
    return this.dataSource.showValidateData(key);
  }

  public onChangeImage(event: IImage | undefined, key: string) {
    if (event) {
      if (key === 'frontImage') {
        this.frontImageIImage = event;
        this.dataSource.frontImage = event.src;
      } else if (key === 'backImage') {
        this.backImageIImage = event;
        this.dataSource.backImage = event.src;
      }
    }
  }

  public onRemoveImage(event: any, key: string) {
    if (event) {
      if (key === 'frontImage') {
        this.frontImageIImage = I_ADD_IMAGE_BG;
        this.dataSource.frontImage = '';
      } else if (key === 'backImage') {
        this.backImageIImage = I_ADD_IMAGE_BG;
        this.dataSource.backImage = '';
      }
    }
  }
}
