import { Component, OnInit } from '@angular/core';
import { IImage } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { IndividualCustomerDetailGeneralModel } from '@app/modules/customer/individual-customer/model/IndividualCustomerDetailGeneral.model';

@Component({
  selector: 'ecore-individual-customer-detail-general',
  templateUrl: './individual-customer-detail-general.component.html',
  styleUrls: ['./individual-customer-detail-general.component.scss'],
})
export class IndividualCustomerDetailGeneralComponent
  extends BaseComponent
  implements OnInit
{
  public dataSource: IndividualCustomerDetailGeneralModel =
    new IndividualCustomerDetailGeneralModel();

  constructor() {
    super();
  }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    const dataSource: IndividualCustomerDetailGeneralModel =
      new IndividualCustomerDetailGeneralModel();
    dataSource.avatar =
      'https://www.primefaces.org/mirage-ng/assets/demo/images/galleria/galleria10.jpg';
    dataSource.idImage =
      'https://www.primefaces.org/mirage-ng/assets/demo/images/product/bamboo-watch.jpg';
    this.dataSource = dataSource;
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
