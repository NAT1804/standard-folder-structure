import { Component, OnInit } from '@angular/core';
import {
  IActionTable,
  ICloseDialog,
  IHeaderColumn,
} from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { BusinessCustomerDetailBankModel } from '@app/modules/customer/business-customer/model/BusinessCustomerDetailBank.model';
import { BusinessCustomerService } from '@app/modules/customer/business-customer/service/business-customer.service';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
  SEVERITY,
  STATUS_RESPONSE,
} from '@app/shared/constants/app.const';
import { CrudBusiCusDetailBankDialogComponent } from './crud-busi-cus-detail-bank-dialog/crud-busi-cus-detail-bank-dialog.component';

@Component({
  selector: 'ecore-business-customer-detail-bank',
  templateUrl: './business-customer-detail-bank.component.html',
  styleUrls: ['./business-customer-detail-bank.component.scss'],
})
export class BusinessCustomerDetailBankComponent
  extends BaseComponent
  implements OnInit
{
  public headerColumns: IHeaderColumn[] = [];
  public dataSource: BusinessCustomerDetailBankModel[] = [];
  public isLoading: boolean;
  public listAction: IActionTable[][] = [];

  constructor(private businessCustomerService: BusinessCustomerService) {
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
    return status ? SEVERITY.PRIMARY : '';
  };

  public funcLabelStatus = (status: boolean) => {
    return status ? 'Mặc định' : '';
  };

  private getData() {
    if (this.businessCustomerService.businessCustomerId) {
      this.businessCustomerService
        .getBusiCusDetailBank(this.businessCustomerService.businessCustomerId)
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
                }) as BusinessCustomerDetailBankModel
            );
            this.genListAction();
          }
        });
    }
  }

  private genListAction() {
    this.listAction = this.dataSource.map(
      (data: BusinessCustomerDetailBankModel) => {
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
        CrudBusiCusDetailBankDialogComponent,
        '600px',
        'auto',
        true,
        {
          customerId: this.businessCustomerService.businessCustomerId,
        }
      );
      modalRef.onClose.subscribe((res: ICloseDialog) => {
        if (res?.status) {
          this.getData();
        }
      });
    }
  }

  public detail(data: BusinessCustomerDetailBankModel) {
    if (data) {
      this.businessCustomerService
        .getBusiCusDetailBankDetail(data.id)
        .subscribe((res: any) => {
          if (res.status === STATUS_RESPONSE.SUCCESS) {
            const modalRef = this.dialogCommonService.createDialog(
              CrudBusiCusDetailBankDialogComponent,
              '600px',
              'auto',
              true,
              {
                customerId: this.businessCustomerService.businessCustomerId,
                dataSource: res.data,
              }
            );
            modalRef.onClose.subscribe((res: ICloseDialog) => {
              if (res?.status) {
                this.getData();
              }
            });
          }
        });
    }
  }
}
