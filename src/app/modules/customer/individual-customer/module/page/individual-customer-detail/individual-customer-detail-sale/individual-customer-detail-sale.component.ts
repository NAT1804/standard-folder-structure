import { Component, OnInit } from '@angular/core';
import {
  IActionTable,
  ICloseDialog,
  IHeaderColumn,
  IValueFormatter,
} from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { IndividualCustomerDetailSaleModel } from '@app/modules/customer/individual-customer/model/IndividualCustomerDetailSale.model';
import { IndividualCustomerService } from '@app/modules/customer/individual-customer/service/individual-customer.service';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
  ETypeFormatDate,
  SEVERITY,
  STATUS_RESPONSE,
} from '@app/shared/constants/app.const';
import { CrudIndiCusDetailSaleDialogComponent } from './crud-indi-cus-detail-sale-dialog/crud-indi-cus-detail-sale-dialog.component';
import { formatDate } from '@app/shared/function-common';

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
        field: 'code',
        header: 'Mã tư vấn',
        minWidth: '10rem',
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
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'phone',
        isResize: true,
      },
      {
        field: 'organization',
        header: 'Phòng ban',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'organization',
        isResize: true,
      },

      {
        field: 'date',
        header: 'Ngày bắt đầu tư vấn',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'date',
        isResize: true,
        valueFormatter: (param: IValueFormatter) =>
          param.data ? formatDate(param.data, ETypeFormatDate.DATE) : '',
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
        .getIndiCusDetailSale(
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
                  code: data.saler_code,
                  name: data.saler_name,
                  phone: data.saler_phone,
                  organization: data.saler_department,
                  date: data.start_date,
                  status: data.is_default,
                }) as IndividualCustomerDetailSaleModel
            );
            this.genListAction();
          }
        });
    }
  }

  private genListAction() {
    this.listAction = this.dataSource.map(
      (data: IndividualCustomerDetailSaleModel) => {
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
        CrudIndiCusDetailSaleDialogComponent,
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

  public detail(data: IndividualCustomerDetailSaleModel) {
    if (data) {
      this.individualCustomerService
        .getIndiCusDetailSaleDetail(data.id)
        .subscribe((res: any) => {
          if (res.status === STATUS_RESPONSE.SUCCESS) {
            const modalRef = this.dialogCommonService.createDialog(
              CrudIndiCusDetailSaleDialogComponent,
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
