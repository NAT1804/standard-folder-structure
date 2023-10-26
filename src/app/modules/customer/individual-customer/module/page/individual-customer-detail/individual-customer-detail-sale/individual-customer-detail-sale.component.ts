import { Component, OnInit } from '@angular/core';
import { IHeaderColumn } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { IndividualCustomerDetailSaleModel } from '@app/modules/customer/individual-customer/model/IndividualCustomerDetailSale.model';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
} from '@app/shared/constants/app.const';

@Component({
  selector: 'ecore-individual-customer-detail-sale',
  templateUrl: './individual-customer-detail-sale.component.html',
  styleUrls: ['./individual-customer-detail-sale.component.scss'],
})
export class IndividualCustomerDetailSaleComponent
  extends BaseComponent
  implements OnInit
{
  public headerColumns: IHeaderColumn[] = [];
  public dataSource: IndividualCustomerDetailSaleModel[] = [];
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
        field: 'code',
        header: 'Mã tư vấn',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'code',
        isResize: true,
      },
      {
        field: 'name',
        header: 'Họ tên',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'name',
        isResize: true,
      },
      {
        field: 'phone',
        header: 'Điện thoại',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'phone',
        isResize: true,
      },
      {
        field: 'organization',
        header: 'Phòng ban',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'organization',
        isResize: true,
      },

      {
        field: 'date',
        header: 'Ngày bắt đầu tư vấn',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'date',
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
    const dataSource: IndividualCustomerDetailSaleModel[] = [
      {
        id: 1,
        code: '1111',
        name: '1111',
        phone: '1111',
        organization: '1111',
        date: '1111',
        status: 1,
      },
      {
        id: 2,
        code: '2222',
        name: '2222',
        phone: '2222',
        organization: '2222',
        date: '2222',
        status: 2,
      },
    ];
    this.dataSource = dataSource;
  }
}
