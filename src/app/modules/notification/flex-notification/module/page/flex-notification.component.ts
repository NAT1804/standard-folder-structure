import { Component, OnInit } from '@angular/core';
import { IActionTable, IHeaderColumn } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { FlexNotificationModel } from '../../model/FlexNotification.model';
import { FlexNotificationConst } from '../../service/flex-notification.const';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
  ETypeStatus,
} from '@app/shared/constants/app.const';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'ecore-flex-notification',
  templateUrl: './flex-notification.component.html',
  styleUrls: ['./flex-notification.component.scss'],
})
export class FlexNotificationComponent extends BaseComponent implements OnInit {
  public headerColumns: IHeaderColumn[] = [];
  public dataSource: FlexNotificationModel[] = [];
  public isLoading: boolean;
  public listAction: IActionTable[][] = [];

  public get listStatus() {
    return FlexNotificationConst.listStatus;
  }

  public getStatusSeverity(code: number) {
    return FlexNotificationConst.getStatus(code, ETypeStatus.SEVERITY);
  }

  public getStatusName(code: number) {
    return FlexNotificationConst.getStatus(code, ETypeStatus.LABEL);
  }

  constructor() {
    super();
  }

  ngOnInit() {
    this.breadcrumbService.setItems([
      { label: 'Trang chủ', routerLink: ['/home'] },
      { label: 'Thông báo' },
      { label: 'Thông báo linh động' },
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
        field: 'title',
        header: 'Tiêu đề',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'title',
        isResize: true,
      },
      {
        field: 'createUser',
        header: 'Người tạo',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'createUser',
        isResize: true,
      },
      {
        field: 'createTime',
        header: 'Thời gian tạo',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'createTime',
        isResize: true,
      },
      {
        field: 'sendTime',
        header: 'Thời gian gửi',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'sendTime',
        isResize: true,
      },
      {
        field: 'smsNumber',
        header: 'Số lượng SMS đã gửi',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'smsNumber',
        isResize: true,
      },
      {
        field: 'appNumber',
        header: 'Số lượng APP đã gửi',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'appNumber',
        isResize: true,
      },
      {
        field: 'emailNumber',
        header: 'Số lượng Email đã gửi',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'emailNumber',
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
        title: '1111',
        createUser: '1111',
        createTime: '1111',
        sendTime: '1111',
        smsNumber: 1,
        appNumber: 1,
        emailNumber: '1111',
        status: 1,
      },
      {
        id: 2,
        title: '2222',
        createUser: '2222',
        createTime: '2222',
        sendTime: '2222',
        smsNumber: 2,
        appNumber: 2,
        emailNumber: '2222',
        status: 2,
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
    // this.listAction = this.dataSource.map((data: IndividualCustomerModel) => {
    //   const actions: IActionTable[] = [];
    //   actions.push({
    //     data: data,
    //     label: 'Xem chi tiết',
    //     icon: 'pi pi-eye',
    //     command: ($event) => {
    //       this.detail($event.item.data);
    //     },
    //   });
    //   return actions;
    // });
  }

  // public detail(data: IndividualCustomerModel) {
  //   if (data) {
  //     this.routerService.routerNavigate(['/individual-customer/' + data.id]);
  //   }
  // }
}
