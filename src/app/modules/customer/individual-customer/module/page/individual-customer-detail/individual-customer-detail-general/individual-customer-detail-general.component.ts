import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IDropdown, IImage } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { IndividualCustomerDetailGeneralModel } from '@app/modules/customer/individual-customer/model/IndividualCustomerDetailGeneral.model';
import { IndividualCustomerConst } from '@app/modules/customer/individual-customer/service/individual-customer.const';
import { IndividualCustomerService } from '@app/modules/customer/individual-customer/service/individual-customer.service';
import { STATUS_RESPONSE } from '@app/shared/constants/app.const';
import { scrollToError } from '@app/shared/function-common';

@Component({
  selector: 'ecore-individual-customer-detail-general',
  templateUrl: './individual-customer-detail-general.component.html',
  styleUrls: ['./individual-customer-detail-general.component.scss'],
})
export class IndividualCustomerDetailGeneralComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  public dataSource: IndividualCustomerDetailGeneralModel =
    new IndividualCustomerDetailGeneralModel();
  public get listGender() {
    return IndividualCustomerConst.listGender;
  }
  public listIdType: IDropdown[] = [];

  constructor(private individualCustomerService: IndividualCustomerService) {
    super();
  }

  ngOnInit() {
    this.individualCustomerService.isEdit = false;
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

    this.individualCustomerService._handleEventSave$.subscribe(
      (res: boolean | undefined) => {
        if (res) {
          this.saveData();
        }
      }
    );
  }

  private initData() {
    this.individualCustomerService.getListIdTypeIndividualCustomer();
  }

  private getData() {
    if (this.individualCustomerService.individualCustomerId) {
      this.individualCustomerService
        .getIndividualCustomerDetail(
          this.individualCustomerService.individualCustomerId
        )
        .subscribe((res) => {
          this.dataSource.mapDTO(res.data);
        });
    }
  }

  public get avatarIImage() {
    return {
      src: this.dataSource.avatar,
      width: 'auto',
    } as IImage;
  }

  public get idImageIImage() {
    return {
      src: this.dataSource.idImage,
      width: 'auto',
    } as IImage;
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
            if (response.status === STATUS_RESPONSE.SUCCESS) {
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
}
