import { Component, OnInit } from '@angular/core';
import { BaseDialogComponent } from '@app/shared/dialogs/base-dialog.component';
import { CreateIndividualCustomerModel } from '../../../model/CreateIndividualCustomer.model';
import {
  IActionButtonDialog,
  IDropdown,
  IImage,
} from '@app/data/interfaces/interface';
import { scrollToError } from '@app/shared/function-common';
import { STATUS_RESPONSE, TYPE_INPUT } from '@app/shared/constants/app.const';
import { IndividualCustomerConst } from '../../../service/individual-customer.const';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
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

    this.dataSource.frontImage =
      'https://www.primefaces.org/mirage-ng/assets/demo/images/galleria/galleria10.jpg';
    this.dataSource.backImage =
      'https://www.primefaces.org/mirage-ng/assets/demo/images/galleria/galleria10.jpg';
    this.dataSource.signatureImage =
      'https://www.primefaces.org/mirage-ng/assets/demo/images/galleria/galleria10.jpg';
  }

  public get frontImageIImage() {
    return {
      src: this.dataSource.frontImage,
      width: 'auto',
    } as IImage;
  }

  public get backImageIImage() {
    return {
      src: this.dataSource.backImage,
      width: 'auto',
    } as IImage;
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
}
