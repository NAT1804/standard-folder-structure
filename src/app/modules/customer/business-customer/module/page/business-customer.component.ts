import { Component, OnInit } from '@angular/core';
import { IActionTable, IHeaderColumn } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { BusinessCustomerModel } from '../../model/BusinessCustomer.model';
import { BusinessCustomerConst } from '../../service/business-customer.const';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
  ETypeStatus,
} from '@app/shared/constants/app.const';
import { MenuItem } from 'primeng/api';
import { DialogCommonService } from '@app/shared/dialogs/dialog-common.service';
import { CreateBusinessCustomerDialogComponent } from './create-business-customer-dialog/create-business-customer-dialog.component';

@Component({
  selector: 'ecore-business-customer',
  templateUrl: './business-customer.component.html',
  styleUrls: ['./business-customer.component.scss'],
})
export class BusinessCustomerComponent extends BaseComponent implements OnInit {
  public headerColumns: IHeaderColumn[] = [];
  public dataSource: BusinessCustomerModel[] = [];
  public isLoading: boolean;
  public listAction: IActionTable[][] = [];

  public get listStatus() {
    return BusinessCustomerConst.listStatus;
  }

  public getStatusSeverity(code: number) {
    return BusinessCustomerConst.getStatus(code, ETypeStatus.SEVERITY);
  }

  public getStatusName(code: number) {
    return BusinessCustomerConst.getStatus(code, ETypeStatus.LABEL);
  }

  constructor() {
    super();
  }

  ngOnInit() {
    this.breadcrumbService.setItems([
      { label: 'Trang chủ', routerLink: ['/home'] },
      { label: 'Khách hàng' },
      { label: 'Khách hàng doanh nghiệp' },
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
        field: 'code',
        header: 'Mã số thuế',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'code',
        isResize: true,
      },
      {
        field: 'abbreviation',
        header: 'Tên viết tắt',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'abbreviation',
        isResize: true,
      },
      {
        field: 'name',
        header: 'Tên doanh nghiệp',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'name',
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
      { id: 1, code: '1111', abbreviation: '1111', name: '1111', status: 1 },
      { id: 2, code: '2222', abbreviation: '2222', name: '2222', status: 2 },
      { id: 3, code: '3333', abbreviation: '3333', name: '3333', status: 1 },
      { id: 4, code: '4444', abbreviation: '4444', name: '4444', status: 1 },
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
    this.listAction = this.dataSource.map((data: BusinessCustomerModel) => {
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
    });
  }

  public detail(data: BusinessCustomerModel) {
    if (data) {
      this.routerService.routerNavigate([
        'customer/business-customer/' + data.id,
      ]);
    }
  }

  public create(event: any) {
    if (event) {
      const modalRef = this.dialogCommonService.createDialog(
        CreateBusinessCustomerDialogComponent,
        '100%',
        '100%'
      );
      modalRef.onClose.subscribe((res) => {
        if (res?.accept) {
          console.log(1111);
        }
      });
    }
  }
}
