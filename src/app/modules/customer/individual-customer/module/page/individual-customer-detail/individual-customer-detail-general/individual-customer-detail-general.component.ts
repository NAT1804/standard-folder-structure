import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IDropdown, IImage } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { IndividualCustomerDetailGeneralModel } from '@app/modules/customer/individual-customer/model/IndividualCustomerDetailGeneral.model';
import { IndividualCustomerConst } from '@app/modules/customer/individual-customer/service/individual-customer.const';
import { IndividualCustomerService } from '@app/modules/customer/individual-customer/service/individual-customer.service';

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
}
