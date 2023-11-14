import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  IActionTable,
  ICloseDialog,
  IDropdown,
  IHeaderColumn,
  ISortTable,
} from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { BusinessCustomerModel } from '../../model/BusinessCustomer.model';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
  STATUS_RESPONSE,
} from '@app/shared/constants/app.const';
import { MenuItem } from 'primeng/api';
import { CreateBusinessCustomerDialogComponent } from './create-business-customer-dialog/create-business-customer-dialog.component';
import { Page } from '@app/data/model/page';
import { BusinessCustomerService } from '../../service/business-customer.service';

@Component({
  selector: 'ecore-business-customer',
  templateUrl: './business-customer.component.html',
  styleUrls: ['./business-customer.component.scss'],
})
export class BusinessCustomerComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  public headerColumns: IHeaderColumn[] = [];
  public dataSource: BusinessCustomerModel[] = [];
  public isLoading: boolean;
  public listAction: IActionTable[][] = [];
  public page: Page = new Page();
  public sort: ISortTable;
  public filter: {
    keyword: string;
    type: string;
    status: number | undefined;
  } = {
    keyword: '',
    type: 'com_tax_code',
    status: undefined,
  };
  public listFilterType: IDropdown[] = [];
  public listStatus: IDropdown[] = [];

  constructor(private businessCustomerService: BusinessCustomerService) {
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
        header: 'Mã số thuế',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'com_tax_code',
        isResize: true,
      },
      {
        field: 'abbreviation',
        header: 'Tên viết tắt',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'com_name_short',
        isResize: true,
      },
      {
        field: 'name',
        header: 'Tên doanh nghiệp',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'com_name',
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
    this.businessCustomerService._listFilterBusinessCustomer$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listFilterType = res;
        }
      }
    );
    this.businessCustomerService._listStatusBusinessCustomer$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listStatus = res;
        }
      }
    );
  }

  private initData() {
    this.businessCustomerService.getListFilterBusinessCustomer();
    this.businessCustomerService.getListStatusBusinessCustomer();
  }

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
        '/customer/business-customer/' + data.id,
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
      modalRef.onClose.subscribe((res: ICloseDialog) => {
        if (res?.status) {
          this.setPage();
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
    this.businessCustomerService
      .getListBusinessCustomer(this.page, this.filter, this.sort)
      .subscribe((res) => {
        this.spinnerService.removeSpinner();
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          this.page.totalItems = res.recordsTotal;
          this.dataSource = res.data.map(
            (data: any) =>
              ({
                no: data.stt,
                id: data.custId,
                code: data.com_tax_code,
                abbreviation: data.com_name_short,
                name: data.com_name,
                status: data.cust_st,
                statusSeverity: data.cust_st_label,
              }) as BusinessCustomerModel
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
