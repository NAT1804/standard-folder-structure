import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { IDropdown, IImage } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { IndividualCustomerDetailGeneralModel } from '@app/modules/customer/individual-customer/model/IndividualCustomerDetailGeneral.model';
import { IndividualCustomerConst } from '@app/modules/customer/individual-customer/service/individual-customer.const';
import { IndividualCustomerService } from '@app/modules/customer/individual-customer/service/individual-customer.service';
import {
  HEIGHT_DEFAULT_IMAGE,
  I_ADD_IMAGE_BG,
  TYPE_INPUT,
  WIDTH_DEFAULT_IMAGE,
} from '@app/shared/constants/app.const';
import { scrollToError } from '@app/shared/function-common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ecore-individual-customer-detail-general',
  templateUrl: './individual-customer-detail-general.component.html',
  styleUrls: ['./individual-customer-detail-general.component.scss'],
})
export class IndividualCustomerDetailGeneralComponent
  extends BaseComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  public dataSource: IndividualCustomerDetailGeneralModel =
    new IndividualCustomerDetailGeneralModel();
  public get listGender() {
    return IndividualCustomerConst.listGender;
  }
  public listIdType: IDropdown[] = [];
  public listNation: IDropdown[] = [];
  public avatarImageIImage: IImage = I_ADD_IMAGE_BG;
  public frontImageIImage: IImage = I_ADD_IMAGE_BG;
  public backImageIImage: IImage = I_ADD_IMAGE_BG;

  public get TYPE_INPUT() {
    return TYPE_INPUT;
  }

  constructor(private individualCustomerService: IndividualCustomerService) {
    super();
  }

  ngOnInit() {
    this.individualCustomerService.isEdit = false;
    this.individualCustomerService._handleEventSave.next(false);
    this.initData();
    this.getData();
  }

  ngAfterViewInit(): void {
    this.individualCustomerService._listIdTypeIndividualCustomer$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listIdType = res;
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

    this.subscriptions.push(
      this.individualCustomerService._handleEventSave$.subscribe(
        (res: boolean | undefined) => {
          if (res) {
            this.saveData();
          }
        }
      )
    );
  }

  private initData() {
    this.individualCustomerService.getListIdTypeIndividualCustomer();
    this.apiConstantService.getListNation();
  }

  private getData() {
    if (this.individualCustomerService.individualCustomerId) {
      this.individualCustomerService
        .getIndividualCustomerDetail(
          this.individualCustomerService.individualCustomerId
        )
        .subscribe((res) => {
          this.dataSource.mapDTO(res.data);
          if (this.dataSource.frontImage && this.dataSource.frontImage.length) {
            this.frontImageIImage = {
              src: this.dataSource.frontImage,
              width: WIDTH_DEFAULT_IMAGE,
              height: HEIGHT_DEFAULT_IMAGE,
            };
          } else {
            this.frontImageIImage = I_ADD_IMAGE_BG;
          }
          if (this.dataSource.backImage && this.dataSource.backImage.length) {
            this.backImageIImage = {
              src: this.dataSource.backImage,
              width: WIDTH_DEFAULT_IMAGE,
              height: HEIGHT_DEFAULT_IMAGE,
            };
          } else {
            this.backImageIImage = I_ADD_IMAGE_BG;
          }
        });
    }
  }

  private saveData() {
    this.isSubmit = true;
    if (this.dataSource.isValidDataEdit()) {
      this.spinnerService.showSpinner();
      this.individualCustomerService
        .createOrEditIndividualCustomer(this.dataSource.toObjectSendAPIEdit())
        .subscribe(
          (response) => {
            this.isSubmit = false;
            this.spinnerService.removeSpinner();
            if (this.handleResponse(response)) {
              this.toastService.showToastSucess(
                'Cập nhật dữ liệu khách hàng thành công!'
              );
              this.individualCustomerService.isEdit = false;
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
    return !this.individualCustomerService.isEdit;
  }

  public onChangeImage(event: IImage | undefined, key: string) {
    if (event) {
      if (key === 'avatarImage') {
        this.avatarImageIImage = event;
        this.dataSource.avatar = event.src;
      } else if (key === 'frontImage') {
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
      if (key === 'avatarImage') {
        this.avatarImageIImage = I_ADD_IMAGE_BG;
        this.dataSource.avatar = '';
      } else if (key === 'frontImage') {
        this.frontImageIImage = I_ADD_IMAGE_BG;
        this.dataSource.frontImage = '';
      } else if (key === 'backImage') {
        this.backImageIImage = I_ADD_IMAGE_BG;
        this.dataSource.backImage = '';
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
