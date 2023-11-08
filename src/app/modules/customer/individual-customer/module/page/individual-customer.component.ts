import { Component, OnInit } from '@angular/core';
import {
  IActionTable,
  IDropdown,
  IHeaderColumn,
  ISortTable,
  IValueFormatter,
} from '@app/data/interfaces/interface';
import { MenuItem } from 'primeng/api';
import { IndividualCustomerModel } from '../../model/IndividualCustomer.model';
import { IndividualCustomerConst } from '../../service/individual-customer.const';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
  ETypeStatus,
  STATUS_RESPONSE,
} from '@app/shared/constants/app.const';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { DialogCommonService } from '@app/shared/dialogs/dialog-common.service';
import { CreateIndividualCustomerDialogComponent } from './create-individual-customer-dialog/create-individual-customer-dialog.component';
import { IndividualCustomerService } from '../../service/individual-customer.service';
import { Page } from '@app/data/model/page';
import { getListDropdownFilter } from '@app/shared/function-common';

@Component({
  selector: 'ecore-individual-customer',
  templateUrl: './individual-customer.component.html',
  styleUrls: ['./individual-customer.component.scss'],
})
export class IndividualCustomerComponent
  extends BaseComponent
  implements OnInit
{
  public headerColumns: IHeaderColumn[] = [];
  public dataSource: IndividualCustomerModel[] = [];
  public isLoading: boolean;
  public listAction: IActionTable[][] = [];
  public page: Page = new Page();
  public sort: ISortTable;
  public filter: {
    keyword: string;
    type: number;
    check: boolean;
    source: number | undefined;
    status: number | undefined;
  } = {
    keyword: '',
    type: 1,
    check: true,
    source: undefined,
    status: undefined,
  };
  public listStatus: IDropdown[] = [];
  public listCreateSource: IDropdown[] = [];

  public get listCheck() {
    return IndividualCustomerConst.listCheck;
  }

  public get listFilterType() {
    return IndividualCustomerConst.listFilterType;
  }

  public getStatusSeverity(code: number) {
    return IndividualCustomerConst.getStatus(code, ETypeStatus.SEVERITY);
  }

  public getStatusName(code: number) {
    return IndividualCustomerConst.getStatus(code, ETypeStatus.LABEL);
  }

  constructor(
    private dialogCommonService: DialogCommonService,
    private individualCustomerService: IndividualCustomerService
  ) {
    super();
  }

  ngOnInit() {
    this.breadcrumbService.setItems([
      { label: 'Trang chủ', routerLink: ['/home'] },
      { label: 'Khách hàng' },
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
        field: 'gender',
        header: 'Giới tính',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'gender',
        isResize: true,
      },
      {
        field: 'birthday',
        header: 'Ngày sinh',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'idNo',
        isResize: true,
      },
      {
        field: 'check',
        header: 'Vận hành kiểm tra',
        minWidth: '10rem',
        type: ETypeDataTable.CHECK_BOX,
        isSort: true,
        fieldSort: 'check',
        isResize: true,
        posTextCell: EPositionTextCell.CENTER,
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
            ? this.listCreateSource.find(
                (e: IDropdown) => e.value === param.data
              )?.label
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
        gender: 1111,
        birthday: '1111',
        check: true,
        source: 1,
        status: 1,
      },
      {
        id: 2,
        code: '2222',
        name: '2222',
        phone: '2222',
        gender: 2222,
        birthday: '2222',
        check: true,
        source: 2,
        status: 2,
      },
      {
        id: 3,
        code: '3333',
        name: '3333',
        phone: '3333',
        gender: 3333,
        birthday: '3333',
        check: true,
        source: 1,
        status: 1,
      },
      {
        id: 4,
        code: '4444',
        name: '4444',
        phone: '4444',
        gender: 4444,
        birthday: '4444',
        check: true,
        source: 2,
        status: 2,
      },
    ];

    this.listStatus = getListDropdownFilter(IndividualCustomerConst.listStatus);
    this.listCreateSource = getListDropdownFilter(
      IndividualCustomerConst.listCreateSource
    );

    this.setPage();
    this.genListAction();
  }

  public funcStyleClassStatus = (status: number) => {
    return this.getStatusSeverity(status);
  };

  public funcLabelStatus = (status: number) => {
    return this.getStatusName(status);
  };

  private genListAction() {
    this.listAction = this.dataSource.map((data: IndividualCustomerModel) => {
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

  public detail(data: IndividualCustomerModel) {
    if (data) {
      this.routerService.routerNavigate([
        '/customer/individual-customer/' + data.id,
      ]);
    }
  }

  public create(event: any) {
    if (event) {
      const modalRef = this.dialogCommonService.createDialog(
        CreateIndividualCustomerDialogComponent,
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

  public changePage(event: any) {
    if (event) {
      this.setPage();
    }
  }

  public changeFilter(event: any) {
    this.setPage();
  }

  private setPage() {
    this.individualCustomerService
      .getListIndividualCustomer(this.page, this.filter, this.sort)
      .subscribe((res) => {
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          this.dataSource = res.data.map(
            (data: any) =>
              ({
                id: data.custId,
                code: '1111',
                name: data.full_name,
                phone: '1111',
                gender: data.sex
                  ? IndividualCustomerConst.NAM
                  : IndividualCustomerConst.NU,
                birthday: data.birthday,
                check: true,
                source: data.cust_source,
                status: data.cust_st,
              }) as IndividualCustomerModel
          );
        }
      });
  }

  public onSort(event: ISortTable) {
    if (event) {
      this.sort = event;
      this.setPage();
    }
  }
}
