import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  IActionButtonDialog,
  ICloseDialog,
  IDropdown,
  IImage,
} from '@app/data/interfaces/interface';
import {
  I_ADD_IMAGE_BG,
  SEVERITY,
  STATUS_RESPONSE,
  TYPE_INPUT,
} from '@app/shared/constants/app.const';
import { BaseDialogComponent } from '@app/shared/dialogs/base-dialog.component';
import { scrollToError } from '@app/shared/function-common';
import { CreateIndividualCustomerModel } from '../../../model/CreateIndividualCustomer.model';
import { IndividualCustomerConst } from '../../../service/individual-customer.const';
import { IndividualCustomerService } from '../../../service/individual-customer.service';

@Component({
  selector: 'ecore-create-individual-customer-dialog',
  templateUrl: './create-individual-customer-dialog.component.html',
  styleUrls: ['./create-individual-customer-dialog.component.scss'],
})
export class CreateIndividualCustomerDialogComponent
  extends BaseDialogComponent
  implements OnInit, AfterViewInit
{
  public listAction: IActionButtonDialog[] = [];
  public dataSource: CreateIndividualCustomerModel =
    new CreateIndividualCustomerModel();
  public listTypeOfDocument: IDropdown[] = [];
  public listNation: IDropdown[] = [];

  public get TYPE_INPUT() {
    return TYPE_INPUT;
  }

  public get listGender() {
    return IndividualCustomerConst.listGender as IDropdown[];
  }
  public frontImageIImage: IImage = I_ADD_IMAGE_BG;
  public backImageIImage: IImage = I_ADD_IMAGE_BG;
  public signatureImageIImage: IImage = I_ADD_IMAGE_BG;

  constructor(private individualCustomerService: IndividualCustomerService) {
    super();
  }

  ngOnInit() {
    this.individualCustomerService.getListIdTypeIndividualCustomer();
    this.apiConstantService.getListNation();
    this.listAction = [
      {
        label: 'Đóng',
        icon: 'pi pi-times',
        typeClassButton: SEVERITY.DANGER,
        callBack: this.onClickCloseDialog,
      },
      {
        label: 'Lưu',
        icon: 'pi pi-save',
        callBack: this.onClickSaveDialog,
      },
    ];
  }

  ngAfterViewInit(): void {
    this.individualCustomerService._listIdTypeIndividualCustomer$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listTypeOfDocument = res;
        }
      }
    );
    this.apiConstantService._listNation$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listNation = res;
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
      this.individualCustomerService
        .createOrEditIndividualCustomer(this.dataSource.toObjectSendToAPI())
        .subscribe((response) => {
          if (response.status === STATUS_RESPONSE.SUCCESS) {
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

  public onChangeImage(event: IImage | undefined, key: string) {
    if (event) {
      if (key === 'frontImage') {
        this.frontImageIImage = event;
        this.dataSource.frontImage = event.src;
      } else if (key === 'backImage') {
        this.backImageIImage = event;
        this.dataSource.backImage = event.src;
      } else if (key === 'signatureImage') {
        this.signatureImageIImage = event;
        this.dataSource.signatureImage = event.src;
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
      } else if (key === 'signatureImage') {
        this.signatureImageIImage = I_ADD_IMAGE_BG;
        this.dataSource.signatureImage = '';
      }
    }
  }
}
