import { Component, OnInit } from '@angular/core';
import { IHeaderColumn } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { IndividualCustomerDetailBankModel } from '@app/modules/customer/individual-customer/model/IndividualCustomerDetailBank.model';
import { IndividualCustomerService } from '@app/modules/customer/individual-customer/service/individual-customer.service';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
  STATUS_RESPONSE,
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

  constructor(private individualCustomerService: IndividualCustomerService) {
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
      },
      {
        field: 'bankName',
        header: 'Tên ngân hàng',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isResize: true,
      },
      {
        field: 'accountNumber',
        header: 'Số tài khoản',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isResize: true,
      },
      {
        field: 'accountName',
        header: 'Tên tài khoản',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        fieldSort: 'accountName',
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
    if (this.individualCustomerService.individualCustomerId) {
      this.individualCustomerService
        .getIndiCusDetailBank(
          this.individualCustomerService.individualCustomerId
        )
        .subscribe((res: any) => {
          this.spinnerService.removeSpinner();
          if (res.status === STATUS_RESPONSE.SUCCESS) {
            this.dataSource = res.data.map(
              (data: any) =>
                ({
                  id: data.acc_no,
                  bankName: data.bank_code,
                  accountNumber: data.acc_no,
                  accountName: data.acc_name,
                  status: 1,
                }) as IndividualCustomerDetailBankModel
            );
          }
        });
    }
  }
}
