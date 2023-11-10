import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  STATUS_RESPONSE,
} from '@app/shared/constants/app.const';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { CreateIndividualCustomerDialogComponent } from './create-individual-customer-dialog/create-individual-customer-dialog.component';
import { IndividualCustomerService } from '../../service/individual-customer.service';
import { Page } from '@app/data/model/page';
import { compareValueToUpperCase } from '@app/shared/function-common';

@Component({
  selector: 'ecore-individual-customer',
  templateUrl: './individual-customer.component.html',
  styleUrls: ['./individual-customer.component.scss'],
})
export class IndividualCustomerComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  public headerColumns: IHeaderColumn[] = [];
  public dataSource: IndividualCustomerModel[] = [];
  public isLoading: boolean;
  public listAction: IActionTable[][] = [];
  public page: Page = new Page();
  public sort: ISortTable;
  public filter: {
    keyword: string;
    type: string;
    check: string | undefined;
    source: number | undefined;
    status: number | undefined;
  } = {
    keyword: '',
    type: 'cif_no',
    check: '0',
    source: undefined,
    status: undefined,
  };
  public listFilterType: IDropdown[] = [];
  public listCheck: IDropdown[] = [];
  public listSource: IDropdown[] = [];
  public listStatus: IDropdown[] = [];

  constructor(private individualCustomerService: IndividualCustomerService) {
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
        field: 'no',
        header: '#ID',
        width: '3rem',
        type: ETypeDataTable.INDEX,
        posTextCell: EPositionTextCell.CENTER,
        isFrozen: true,
        posFrozen: EPositionFrozenCell.LEFT,
        isSort: true,
        fieldSort: 'stt',
      },
      {
        field: 'code',
        header: 'Mã khách hàng',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'cif_no',
        isResize: true,
      },
      {
        field: 'name',
        header: 'Tên khách hàng',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'full_name',
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
        fieldSort: 'sex',
        isResize: true,
        valueFormatter: (param: IValueFormatter) =>
          param.data
            ? IndividualCustomerConst.listGender.find((e: IDropdown) =>
                compareValueToUpperCase(e.value, param.data)
              )?.label
            : '',
      },
      {
        field: 'birthday',
        header: 'Ngày sinh',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'birthday',
        isResize: true,
      },
      {
        field: 'check',
        header: 'Vận hành kiểm tra',
        minWidth: '10rem',
        type: ETypeDataTable.CHECK_BOX,
        isSort: true,
        fieldSort: 'is_check',
        isResize: true,
        posTextCell: EPositionTextCell.CENTER,
      },
      {
        field: 'source',
        header: 'Nguồn khởi tạo',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'cust_source',
        isResize: true,
      },
      {
        field: 'status',
        header: 'Trạng thái',
        width: '8rem',
        type: ETypeDataTable.STATUS,
        fieldStatus: {
          fieldLabel: 'status',
          fieldSeverity: 'statusSeverity',
        },
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

    this.initData();
    this.setPage();
  }

  ngAfterViewInit(): void {
    this.individualCustomerService._listFilterIndividualCustomer$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listFilterType = res;
        }
      }
    );
    this.individualCustomerService._listCheckIndividualCustomer$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listCheck = res;
        }
      }
    );
    this.individualCustomerService._listSourceIndividualCustomer$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listSource = res;
        }
      }
    );
    this.individualCustomerService._listStatusIndividualCustomer$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listStatus = res;
        }
      }
    );
  }

  private initData() {
    this.individualCustomerService.getListFilterIndividualCustomer();
    this.individualCustomerService.getListCheckIndividualCustomer();
    this.individualCustomerService.getListSourceIndividualCustomer();
    this.individualCustomerService.getListStatusIndividualCustomer();
  }

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
    this.spinnerService.showSpinner();
    this.individualCustomerService
      .getListIndividualCustomer(this.page, this.filter, this.sort)
      .subscribe((res) => {
        this.spinnerService.removeSpinner();
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          this.page.totalItems = res.recordsTotal;
          this.dataSource = res.data.map(
            (data: any) =>
              ({
                id: data.custId,
                no: data.stt,
                code: data.cif_no,
                name: data.full_name,
                phone: data.phone,
                gender: data.sex,
                birthday: data.birthday,
                check: !!data.is_check,
                source: data.cust_source,
                status: data.cust_st,
                statusSeverity: data.cust_st_label,
              }) as IndividualCustomerModel
          );
          this.genListAction();
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
