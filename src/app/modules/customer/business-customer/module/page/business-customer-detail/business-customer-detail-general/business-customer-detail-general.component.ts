import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IImage } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { BusinessCustomerDetailGeneralModel } from '@app/modules/customer/business-customer/model/BusinessCustomerDetailGeneral.model';
import { BusinessCustomerService } from '@app/modules/customer/business-customer/service/business-customer.service';
import {
  HEIGHT_DEFAULT_IMAGE,
  I_ADD_IMAGE_BG,
  STATUS_RESPONSE,
  TYPE_INPUT,
  WIDTH_DEFAULT_IMAGE,
} from '@app/shared/constants/app.const';
import { scrollToError } from '@app/shared/function-common';

@Component({
  selector: 'ecore-business-customer-detail-general',
  templateUrl: './business-customer-detail-general.component.html',
  styleUrls: ['./business-customer-detail-general.component.scss'],
})
export class BusinessCustomerDetailGeneralComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  public dataSource: BusinessCustomerDetailGeneralModel =
    new BusinessCustomerDetailGeneralModel();
  public avatarIImage: IImage = I_ADD_IMAGE_BG;

  public get TYPE_INPUT() {
    return TYPE_INPUT;
  }

  constructor(private businessCustomerService: BusinessCustomerService) {
    super();
  }

  ngOnInit() {
    this.businessCustomerService.isEdit = false;
    this.businessCustomerService._handleEventSave.next(false);
    this.getData();
  }

  ngAfterViewInit(): void {
    this.businessCustomerService._handleEventSave$.subscribe(
      (res: boolean | undefined) => {
        if (res) {
          this.saveData();
        }
      }
    );
  }

  private getData() {
    this.spinnerService.showSpinner();
    if (this.businessCustomerService.businessCustomerId) {
      this.businessCustomerService
        .getBusinessCustomerDetail(
          this.businessCustomerService.businessCustomerId
        )
        .subscribe(
          (res) => {
            this.spinnerService.removeSpinner();
            this.dataSource.mapDTO(res.data);
            if (this.dataSource.avatar && this.dataSource.avatar.length) {
              this.avatarIImage = {
                src: this.dataSource.avatar,
                width: WIDTH_DEFAULT_IMAGE,
                height: HEIGHT_DEFAULT_IMAGE,
              };
            } else {
              this.avatarIImage = I_ADD_IMAGE_BG;
            }
          },
          () => {
            this.spinnerService.removeSpinner();
          }
        );
    }
  }

  private saveData() {
    this.isSubmit = true;
    if (this.dataSource.isValidDataEdit()) {
      this.spinnerService.showSpinner();
      this.businessCustomerService
        .createOrEditBusinessCustomer(this.dataSource.toObjectSendAPIEdit())
        .subscribe(
          (response) => {
            this.isSubmit = false;
            this.spinnerService.removeSpinner();
            if (response.status === STATUS_RESPONSE.SUCCESS) {
              this.toastService.showToastSucess(
                'Cập nhật dữ liệu khách hàng thành công!'
              );
              this.businessCustomerService.isEdit = false;
              this.getData();
            }
          },
          () => {
            this.isSubmit = false;
            this.spinnerService.removeSpinner();
          }
        );
    } else {
      scrollToError();
    }
  }

  public isValidData(key: string) {
    return this.dataSource.showValidateData(key);
  }

  public get isDisabled() {
    return !this.businessCustomerService.isEdit;
  }

  public onChangeAvatar(event: IImage | undefined) {
    if (event) {
      this.avatarIImage = event;
      this.dataSource.avatar = event.src;
    }
  }

  public onRemoveAvatar(event: any) {
    if (event) {
      this.avatarIImage = I_ADD_IMAGE_BG;
      this.dataSource.avatar = '';
    }
  }
}
