import { Component, OnInit } from '@angular/core';
import {
  IActionTable,
  ICloseDialog,
  IHeaderColumn,
  IValueFormatter,
} from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { IndividualCustomerDetailVerifyModel } from '@app/modules/customer/individual-customer/model/IndividualCustomerDetailVerify.model';
import { IndividualCustomerService } from '@app/modules/customer/individual-customer/service/individual-customer.service';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
  ETypeFormatDate,
  SEVERITY,
  STATUS_RESPONSE,
} from '@app/shared/constants/app.const';
import { CrudIndiCusDetailVerifyDialogComponent } from './crud-indi-cus-detail-verify-dialog/crud-indi-cus-detail-verify-dialog.component';
import { formatDate } from '@app/shared/function-common';

@Component({
  selector: 'ecore-individual-customer-detail-verify',
  templateUrl: './individual-customer-detail-verify.component.html',
  styleUrls: ['./individual-customer-detail-verify.component.scss'],
})
export class IndividualCustomerDetailVerifyComponent
  extends BaseComponent
  implements OnInit
{
  public headerColumns: IHeaderColumn[] = [];
  public dataSource: IndividualCustomerDetailVerifyModel[] = [];
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
        isSort: true,
        fieldSort: 'id',
      },
      {
        field: 'documentType',
        header: 'Loại giấy tờ',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'idcard_type',
        isResize: true,
      },
      {
        field: 'code',
        header: 'Mã giấy tờ',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'idcard_no',
        isResize: true,
      },
      {
        field: 'date',
        header: 'Ngày cấp',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'idcard_issue_dt',
        isResize: true,
        valueFormatter: (param: IValueFormatter) =>
          param.data ? formatDate(param.data, ETypeFormatDate.DATE) : '',
      },
      {
        field: 'expiredDate',
        header: 'Ngày hết hạn',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'idcard_expire_dt',
        isResize: true,
        valueFormatter: (param: IValueFormatter) =>
          param.data ? formatDate(param.data, ETypeFormatDate.DATE) : '',
      },
      {
        field: 'frontImage',
        header: 'Ảnh mặt trước',
        minWidth: '10rem',
        type: ETypeDataTable.IMAGE,
        isSort: true,
        fieldSort: 'idcard_font_url',
        isResize: true,
      },
      {
        field: 'backImage',
        header: 'Ảnh mặt sau',
        minWidth: '10rem',
        type: ETypeDataTable.IMAGE,
        isSort: true,
        fieldSort: 'idcard_back_url',
        isResize: true,
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
        .getIndiCusDetailVerify(
          this.individualCustomerService.individualCustomerId
        )
        .subscribe((res: any) => {
          this.spinnerService.removeSpinner();
          if (res.status === STATUS_RESPONSE.SUCCESS) {
            this.dataSource = res.data.map(
              (data: any, index: number) =>
                ({
                  no: index,
                  id: data.id,
                  documentType: data.idcard_type_name,
                  code: data.idcard_no,
                  date: data.idcard_issue_dt,
                  expiredDate: data.idcard_expire_dt,
                  frontImage: data.idcard_font_url,
                  backImage: data.idcard_back_url,
                  status: data.is_default,
                }) as IndividualCustomerDetailVerifyModel
            );
            this.genListAction();
          }
        });
    }
  }

  private genListAction() {
    this.listAction = this.dataSource.map(
      (data: IndividualCustomerDetailVerifyModel) => {
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
        CrudIndiCusDetailVerifyDialogComponent,
        '600px',
        'auto',
        true,
        {
          customerId: this.individualCustomerService.individualCustomerId,
        }
      );
      modalRef.onClose.subscribe((res: ICloseDialog) => {
        if (res?.status) {
          this.getData();
        }
      });
    }
  }

  public detail(data: IndividualCustomerDetailVerifyModel) {
    if (data) {
      this.individualCustomerService
        .getIndiCusDetailSaleVerify(data.id)
        .subscribe((res: any) => {
          if (res.status === STATUS_RESPONSE.SUCCESS) {
            const modalRef = this.dialogCommonService.createDialog(
              CrudIndiCusDetailVerifyDialogComponent,
              '600px',
              'auto',
              true,
              {
                customerId: this.individualCustomerService.individualCustomerId,
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
