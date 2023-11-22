import { Component, OnInit } from '@angular/core';
import { IActionTable, IHeaderColumn } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
  ETypeStatus,
} from '@app/shared/constants/app.const';
import { SettingBusinessModel } from '../../model/SettingBusiness.model';
import { SettingBusinessConst } from '../../service/setting-business.const';

@Component({
  selector: 'emir-setting-business',
  templateUrl: './setting-business.component.html',
  styleUrls: ['./setting-business.component.scss'],
})
export class SettingBusinessComponent extends BaseComponent implements OnInit {
  public headerColumns: IHeaderColumn[] = [];
  public dataSource: SettingBusinessModel[] = [];
  public isLoading: boolean;
  public listAction: IActionTable[][] = [];

  public get listStatus() {
    return SettingBusinessConst.listStatus;
  }

  public getStatusSeverity(code: number) {
    return SettingBusinessConst.getStatus(code, ETypeStatus.SEVERITY);
  }

  public getStatusName(code: number) {
    return SettingBusinessConst.getStatus(code, ETypeStatus.LABEL);
  }

  constructor() {
    super();
  }

  ngOnInit() {
    // this.breadcrumbService.setItems([
    //   { label: 'Trang chủ', routerLink: ['/home'] },
    //   { label: 'Cài đặt chung' },
    //   { label: 'Thông tin doanh nghiệp' },
    // ] as MenuItem[]);

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
      {
        id: 1,
        code: '1111',
        name: '1111',
        status: 1,
      },
      {
        id: 2,
        code: '2222',
        name: '2222',
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
