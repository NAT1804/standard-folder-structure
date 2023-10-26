import { Component, OnInit } from '@angular/core';
import { IHeaderColumn } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { IndividualCustomerDetailBankModel } from '@app/modules/customer/individual-customer/model/IndividualCustomerDetailBank.model';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
} from '@app/shared/constants/app.const';

@Component({
  selector: 'ecore-individual-customer-detail-bank',
  templateUrl: './individual-customer-detail-bank.component.html',
  styleUrls: ['./individual-customer-detail-bank.component.scss'],
})
export class IndividualCustomerDetailBankComponent
  extends BaseComponent
  implements OnInit
{
  public headerColumns: IHeaderColumn[] = [];
  public dataSource: IndividualCustomerDetailBankModel[] = [];
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
        field: 'bankName',
        header: 'Tên ngân hàng',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'bankName',
        isResize: true,
      },
      {
        field: 'accountNumber',
        header: 'Số tài khoản',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'accountNumber',
        isResize: true,
      },
      {
        field: 'accountName',
        header: 'Tên tài khoản',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'accountName',
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
    const dataSource: IndividualCustomerDetailBankModel[] = [
      {
        id: 1,
        bankName: '1111',
        accountNumber: '1111',
        accountName: '1111',
        status: 1,
      },
      {
        id: 2,
        bankName: '2222',
        accountNumber: '2222',
        accountName: '2222',
        status: 2,
      },
    ];
    this.dataSource = dataSource;
  }
}
