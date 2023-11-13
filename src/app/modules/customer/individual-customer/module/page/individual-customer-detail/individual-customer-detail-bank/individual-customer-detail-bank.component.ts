import { Component, OnInit } from '@angular/core';
import {
  IActionTable,
  ICloseDialog,
  IHeaderColumn,
} from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { IndividualCustomerDetailBankModel } from '@app/modules/customer/individual-customer/model/IndividualCustomerDetailBank.model';
import { IndividualCustomerService } from '@app/modules/customer/individual-customer/service/individual-customer.service';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
  SEVERITY,
  STATUS_RESPONSE,
} from '@app/shared/constants/app.const';
import { CrudIndiCusDetailBankDialogComponent } from './crud-indi-cus-detail-bank-dialog/crud-indi-cus-detail-bank-dialog.component';

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
  public listAction: IActionTable[][] = [];

  constructor(private individualCustomerService: IndividualCustomerService) {
    super();
  }

  ngOnInit() {
    this.headerColumns = this.headerColumns = [
      {
        field: 'no',
        header: '#ID',
        width: '3rem',
        type: ETypeDataTable.INDEX,
        posTextCell: EPositionTextCell.CENTER,
        isFrozen: true,
        posFrozen: EPositionFrozenCell.LEFT,
        fieldSort: 'id',
      },
      {
        field: 'bankName',
        header: 'Tên ngân hàng',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isResize: true,
        fieldSort: 'bank_code',
      },
      {
        field: 'accountNumber',
        header: 'Số tài khoản',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isResize: true,
        fieldSort: 'acc_no',
      },
      {
        field: 'accountName',
        header: 'Tên tài khoản',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        fieldSort: 'acc_name',
      },
      {
        field: 'status',
        header: 'Trạng thái',
        width: '8rem',
        type: ETypeDataTable.STATUS,
        funcStyleClassStatus: this.funcStyleClassStatus,
        funcLabelStatus: this.funcLabelStatus,
        posTextCell: EPositionTextCell.LEFT,
        isFrozen: true,
        posFrozen: EPositionFrozenCell.RIGHT,
      },
      {
        field: '',
        header: '',
        width: '3rem',
        type: ETypeDataTable.ACTION,
        posTextCell: EPositionTextCell.CENTER,
        isFrozen: true,
        posFrozen: EPositionFrozenCell.RIGHT,
      },
    ];

    this.getData();
  }

  public funcStyleClassStatus = (status: boolean) => {
    return status ? SEVERITY.INFO : '';
  };

  public funcLabelStatus = (status: boolean) => {
    return status ? 'Mặc định' : '';
  };

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
              (data: any, index: number) =>
                ({
                  id: data.id,
                  no: index,
                  bankName: data.bank_code,
                  accountNumber: data.acc_no,
                  accountName: data.acc_name,
                  status: data.is_default,
                }) as IndividualCustomerDetailBankModel
            );
            this.genListAction();
          }
        });
    }
  }

  private genListAction() {
    this.listAction = this.dataSource.map(
      (data: IndividualCustomerDetailBankModel) => {
        const actions: IActionTable[] = [];

        actions.push({
          data: data,
          label: 'Xem chi tiết',
          icon: 'pi pi-eye',
          command: ($event) => {
            this.detail($event.item.data);
          },
        });

        return actions;
      }
    );
  }

  public create(event: any) {
    if (event) {
      const modalRef = this.dialogCommonService.createDialog(
        CrudIndiCusDetailBankDialogComponent,
        '600px',
        'auto',
        true,
        {
          customerId: this.individualCustomerService.individualCustomerId,
        }
      );
      modalRef.onClose.subscribe((res: ICloseDialog) => {
        if (res.status) {
          this.getData();
        }
      });
    }
  }

  public detail(data: IndividualCustomerDetailBankModel) {
    if (data) {
      this.individualCustomerService
        .getIndiCusDetailBankDetail(data.id)
        .subscribe((res: any) => {
          if (res.status === STATUS_RESPONSE.SUCCESS) {
            const modalRef = this.dialogCommonService.createDialog(
              CrudIndiCusDetailBankDialogComponent,
              '600px',
              'auto',
              true,
              {
                customerId: this.individualCustomerService.individualCustomerId,
                dataSource: res.data,
              }
            );
            modalRef.onClose.subscribe((res: ICloseDialog) => {
              if (res.status) {
                this.getData();
              }
            });
          }
        });
    }
  }
}
