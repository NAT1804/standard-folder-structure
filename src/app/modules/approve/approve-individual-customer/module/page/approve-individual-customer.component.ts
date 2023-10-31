import { Component, OnInit } from '@angular/core';
import {
  IActionTable,
  IDropdown,
  IHeaderColumn,
  IValueFormatter,
} from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { ApproveIndividualCustomerModel } from '../../model/ApproveIndividualCustomer.model';
import { ApproveIndividualCustomerConst } from '../../service/approve-individual-customer.const';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
  ETypeStatus,
} from '@app/shared/constants/app.const';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'emir-approve-individual-customer',
  templateUrl: './approve-individual-customer.component.html',
  styleUrls: ['./approve-individual-customer.component.scss'],
})
export class ApproveIndividualCustomerComponent
  extends BaseComponent
  implements OnInit
{
  public headerColumns: IHeaderColumn[] = [];
  public dataSource: ApproveIndividualCustomerModel[] = [];
  public isLoading: boolean;
  public listAction: IActionTable[][] = [];

  public get listActionConst() {
    return ApproveIndividualCustomerConst.listAction;
  }

  public get listStatus() {
    return ApproveIndividualCustomerConst.listStatus;
  }

  public getStatusSeverity(code: number) {
    return ApproveIndividualCustomerConst.getStatus(code, ETypeStatus.SEVERITY);
  }

  public getStatusName(code: number) {
    return ApproveIndividualCustomerConst.getStatus(code, ETypeStatus.LABEL);
  }

  constructor() {
    super();
  }

  ngOnInit() {
    this.breadcrumbService.setItems([
      { label: 'Trang chủ', routerLink: ['/home'] },
      { label: 'Quản lý phê duyệt' },
      { label: 'Khách hàng cá nhân' },
    ] as MenuItem[]);

    this.headerColumns = [
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
        field: 'action',
        header: 'Thao tác',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'action',
        isResize: true,
        valueFormatter: (param: IValueFormatter) =>
          param.data
            ? this.listActionConst.find(
                (e: IDropdown) => e.value === param.data
              )?.label
            : '',
      },

      {
        field: 'customer',
        header: 'Thông tin khách hàng',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'customer',
        isResize: true,
      },
      {
        field: 'actionTime',
        header: 'Thời gian thao tác',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'actionTime',
        isResize: true,
      },
      {
        field: 'actionUser',
        header: 'Người thao tác',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'actionUser',
        isResize: true,
      },
      {
        field: 'publicTime',
        header: 'Thời gian trình duyệt',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'publicTime',
        isResize: true,
      },
      {
        field: 'publicUser',
        header: 'Người trình duyệt',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'publicUser',
        isResize: true,
      },
      {
        field: 'handleTime',
        header: 'Thời gian xử lý',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'handleTime',
        isResize: true,
      },
      {
        field: 'handleUser',
        header: 'Người xử lý',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'handleUser',
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
    ] as IHeaderColumn[];

    this.dataSource = [
      {
        id: 1,
        action: 1,
        customer: '1111',
        actionTime: '1111',
        actionUser: '1111',
        publicTime: '1111',
        publicUser: '1111',
        handleTime: '1111',
        handleUser: '1111',
        status: 1,
      },
      {
        id: 2,
        action: 2,
        customer: '2222',
        actionTime: '2222',
        actionUser: '2222',
        publicTime: '2222',
        publicUser: '2222',
        handleTime: '2222',
        handleUser: '2222',
        status: 2,
      },
      {
        id: 3,
        action: 1,
        customer: '3333',
        actionTime: '3333',
        actionUser: '3333',
        publicTime: '3333',
        publicUser: '3333',
        handleTime: '3333',
        handleUser: '3333',
        status: 3,
      },
      {
        id: 4,
        action: 1,
        customer: '4444',
        actionTime: '4444',
        actionUser: '4444',
        publicTime: '4444',
        publicUser: '4444',
        handleTime: '4444',
        handleUser: '4444',
        status: 4,
      },
    ];
    this.genListAction();
  }

  public funcStyleClassStatus = (status: number) => {
    return this.getStatusSeverity(status);
  };

  public funcLabelStatus = (status: number) => {
    return this.getStatusName(status);
  };

  private genListAction() {
    this.listAction = this.dataSource.map(
      (data: ApproveIndividualCustomerModel) => {
        const actions: IActionTable[] = [];

        if (data.status === ApproveIndividualCustomerConst.KHOI_TAO) {
          actions.push({
            data: data,
            label: 'Trình duyệt',
            icon: 'pi pi-eye',
            command: ($event) => {
              this.public($event.item.data);
            },
          });
        }
        if (data.status === ApproveIndividualCustomerConst.TRINH_DUYET) {
          actions.push({
            data: data,
            label: 'Xử lý yêu cầu',
            icon: 'pi pi-eye',
            command: ($event) => {
              this.request($event.item.data);
            },
          });
        }
        if (
          data.status === ApproveIndividualCustomerConst.DA_DUYET ||
          data.status === ApproveIndividualCustomerConst.HUY_DUYET
        ) {
          actions.push({
            data: data,
            label: 'Lịch sử thay đổi',
            icon: 'pi pi-eye',
            command: ($event) => {
              this.history($event.item.data);
            },
          });
        }

        return actions;
      }
    );
  }

  public public(data: ApproveIndividualCustomerModel) {
    if (data) {
      console.log('public');
    }
  }

  public request(data: ApproveIndividualCustomerModel) {
    if (data) {
      console.log('request');
    }
  }

  public history(data: ApproveIndividualCustomerModel) {
    if (data) {
      console.log('history');
    }
  }
}
