import { Component, OnInit } from '@angular/core';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
  ETypeStatus,
} from '@app/shared/constants/app.const';
import {
  IActionTable,
  IDropdown,
  IHeaderColumn,
  IValueFormatter,
} from '@app/data/interfaces/interface';
import { MenuItem } from 'primeng/api';
import { AccountVerifiedModel } from '../../model/AccountVerified.model';
import { AccountVerifiedConst } from '../../service/account-verified.const';
import { DialogCommonService } from '@app/shared/dialogs/dialog-common.service';
import { BaseComponent } from '@app/modules/base-component/base-component.component';

@Component({
  selector: 'app-account-verified',
  templateUrl: './account-verified.component.html',
  styleUrls: ['./account-verified.component.scss'],
})
export class AccountVerifiedComponent extends BaseComponent implements OnInit {
  public headerColumns: IHeaderColumn[] = [];
  public dataSource: AccountVerifiedModel[] = [];
  public isLoading: boolean;
  public listAction: IActionTable[][] = [];

  public get listSource() {
    return AccountVerifiedConst.listAccountCreationSource;
  }

  public get listStatus() {
    return AccountVerifiedConst.listStatus;
  }

  public getStatusSeverity(code: number) {
    return AccountVerifiedConst.getStatus(code, ETypeStatus.SEVERITY);
  }

  public getStatusName(code: number) {
    return AccountVerifiedConst.getStatus(code, ETypeStatus.LABEL);
  }

  constructor(private dialogCommonService: DialogCommonService) {
    super();
  }

  ngOnInit() {
    this.breadcrumbService.setItems([
      { label: 'Trang chủ', routerLink: ['/home'] },
      { label: 'Tài khoản' },
      { label: 'Tài khoản xác minh' },
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
        header: 'Mã khách hàng',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'code',
        isResize: true,
      },
      {
        field: 'name',
        header: 'Tên khách hàng',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'name',
        isResize: true,
      },
      {
        field: 'phone',
        header: 'Số điện thoại',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'phone',
        isResize: true,
      },
      {
        field: 'email',
        header: 'Email',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'email',
        isResize: true,
      },
      {
        field: 'idNo',
        header: 'Số giấy tờ',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'idNo',
        isResize: true,
      },
      {
        field: 'phone',
        header: 'Số điện thoại',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'phone',
        isResize: true,
      },
      {
        field: 'referralCode',
        header: 'Mã giới thiệu',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'referralCode',
        isResize: true,
      },
      {
        field: 'source',
        header: 'Nguồn khởi tạo',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'source',
        isResize: true,
        valueFormatter: (param: IValueFormatter) =>
          param.data
            ? this.listSource.find((e: IDropdown) => e.value === param.data)
                ?.label
            : '',
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
        phone: '1111',
        email: '1111',
        idNo: '1111',
        referralCode: '1111',
        source: 1,
        status: 1,
      },
      {
        id: 2,
        code: '2222',
        name: '2222',
        phone: '2222',
        email: '2222',
        idNo: '2222',
        referralCode: '2222',
        source: 2,
        status: 2,
      },
      {
        id: 3,
        code: '3333',
        name: '3333',
        phone: '3333',
        email: '3333',
        idNo: '3333',
        referralCode: '3333',
        source: 3,
        status: 3,
      },
      {
        id: 4,
        code: '4444',
        name: '4444',
        phone: '4444',
        email: '4444',
        idNo: '4444',
        referralCode: '4444',
        source: 1,
        status: 1,
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
    this.listAction = this.dataSource.map((data: AccountVerifiedModel) => {
      const actions: IActionTable[] = [];

      if (data.status === AccountVerifiedConst.HOAT_DONG) {
        actions.push({
          data: data,
          label: 'Khóa tài khoản',
          icon: 'pi pi-lock',
          command: ($event) => {
            this.lock($event.item.data);
          },
        });
      }

      return actions;
    });
  }

  public lock(data: AccountVerifiedModel) {
    if (data) {
      this.dialogCommonService.createConfirmDialog(
        'Khóa tài khoản',
        'Khóa tài khoản',
        () => {
          console.log('accept');
        },
        () => {
          console.log('reject');
        }
      );
    }
  }
}
