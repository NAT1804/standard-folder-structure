import { Component, OnInit } from '@angular/core';
import { IHeaderColumn } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { IndividualCustomerDetailContactModel } from '@app/modules/customer/individual-customer/model/IndividualCustomerDetailContact.model';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
} from '@app/shared/constants/app.const';

@Component({
  selector: 'ecore-individual-customer-detail-contact',
  templateUrl: './individual-customer-detail-contact.component.html',
  styleUrls: ['./individual-customer-detail-contact.component.scss'],
})
export class IndividualCustomerDetailContactComponent
  extends BaseComponent
  implements OnInit
{
  public headerColumns: IHeaderColumn[] = [];
  public dataSource: IndividualCustomerDetailContactModel[] = [];
  public isLoading: boolean;
  // public listAction: IActionTable[][] = [];

  // public getStatusSeverity(code: number) {
  //   return IndividualCustomerConst.getStatus(code, ETypeStatus.SEVERITY);
  // }

  // public getStatusName(code: number) {
  //   return IndividualCustomerConst.getStatus(code, ETypeStatus.LABEL);
  // }

  constructor() {
    super();
  }

  ngOnInit() {
    this.headerColumns = this.headerColumns = [
      {
        field: 'id',
        header: '#ID',
        width: '3rem',
        type: ETypeDataTable.INDEX,
        posTextCell: EPositionTextCell.CENTER,
        isFrozen: true,
        posFrozen: EPositionFrozenCell.LEFT,
        isSort: true,
        fieldSort: 'id',
      },
      {
        field: 'contactName',
        header: 'Tên địa chỉ liên hệ',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'contactName',
        isResize: true,
      },
      // {
      //   field: 'status',
      //   header: 'Trạng thái',
      //   width: '8rem',
      //   type: ETypeDataTable.STATUS,
      //   funcStyleClassStatus: this.funcStyleClassStatus,
      //   funcLabelStatus: this.funcLabelStatus,
      //   posTextCell: EPositionTextCell.LEFT,
      //   isFrozen: true,
      //   posFrozen: EPositionFrozenCell.RIGHT,
      // },
    ];

    this.getData();
  }

  // public funcStyleClassStatus = (status: number) => {
  //   return this.getStatusSeverity(status);
  // };

  // public funcLabelStatus = (status: number) => {
  //   return this.getStatusName(status);
  // };

  private getData() {
    const dataSource: IndividualCustomerDetailContactModel[] = [
      {
        id: 1,
        contactName: '1111',
        status: 1,
      },
      {
        id: 2,
        contactName: '2222',
        status: 2,
      },
    ];
    this.dataSource = dataSource;
  }
}
