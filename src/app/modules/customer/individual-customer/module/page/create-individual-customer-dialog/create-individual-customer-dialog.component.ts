import { Component, OnInit } from '@angular/core';
import { BaseDialogComponent } from '@app/shared/dialogs/base-dialog.component';
import { CreateIndividualCustomerModel } from '../../../model/CreateIndividualCustomer.model';
import {
  IActionButtonDialog,
  IDropdown,
  IImage,
} from '@app/data/interfaces/interface';
import { scrollToError } from '@app/shared/function-common';
import {
  I_ADD_IMAGE_BG,
  STATUS_RESPONSE,
  TYPE_INPUT,
} from '@app/shared/constants/app.const';
import { IndividualCustomerConst } from '../../../service/individual-customer.const';
import { IndividualCustomerService } from '../../../service/individual-customer.service';

@Component({
  selector: 'ecore-create-individual-customer-dialog',
  templateUrl: './create-individual-customer-dialog.component.html',
  styleUrls: ['./create-individual-customer-dialog.component.scss'],
})
export class CreateIndividualCustomerDialogComponent
  extends BaseDialogComponent
  implements OnInit
{
  public listAction: IActionButtonDialog[] = [];
  public dataSource: CreateIndividualCustomerModel =
    new CreateIndividualCustomerModel();

  public get TYPE_INPUT() {
    return TYPE_INPUT;
  }

  public get listTypeOfDocument() {
    return [] as IDropdown[];
  }

  public get listGender() {
    return IndividualCustomerConst.listGender as IDropdown[];
  }
  public frontImageIImage: IImage;
  public backImageIImage: IImage;

  constructor(private individualCustomerService: IndividualCustomerService) {
    super();
  }

  ngOnInit() {
    this.listAction = [
      {
        label: 'Đóng',
        callBack: this.onClickCloseDialog,
      },
      {
        label: 'Lưu',
        callBack: this.onClickSaveDialog,
      },
    ];

    this.frontImageIImage = I_ADD_IMAGE_BG;
    this.backImageIImage = I_ADD_IMAGE_BG;
  }

  public get signatureImageIImage() {
    return {
      src: this.dataSource.signatureImage,
      width: 'auto',
    } as IImage;
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
            this.dynamicDialogRef.close();
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
      } else if (key === 'backImage') {
        this.backImageIImage = event;
      }
    }
  }
}
