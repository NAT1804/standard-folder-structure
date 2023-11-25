import { Component, OnInit } from '@angular/core';
import {
  IActionTable,
  IConfigDataConfirmNoteDialog,
  IDropdown,
  IHeaderColumn,
  ISortTable,
} from '@app/data/interfaces/interface';
import { Page } from '@app/data/model/page';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
  STATUS_RESPONSE,
} from '@app/shared/constants/app.const';
import { ConfirmNoteDialogComponent } from '@app/shared/dialogs/confirm-note-dialog/confirm-note-dialog.component';
import { ApproveBusinessCustomerModel } from '../../model/ApproveBusinessCustomer.model';
import { ApproveBusinessCustomerConst } from '../../service/approve-business-customer.const';
import { ApproveBusinessCustomerService } from '../../service/approve-business-customer.service';

@Component({
  selector: 'emir-approve-business-customer',
  templateUrl: './approve-business-customer.component.html',
  styleUrls: ['./approve-business-customer.component.scss'],
})
export class ApproveBusinessCustomerComponent
  extends BaseComponent
  implements OnInit
{
  public headerColumns: IHeaderColumn[] = [];
  public dataSource: ApproveBusinessCustomerModel[] = [];
  public isLoading: boolean;
  public listAction: IActionTable[][] = [];
  public page: Page = new Page();
  public sort: ISortTable;
  public filter: {
    keyword: string;
    type: string;
    action: number | undefined;
    status: number | undefined;
  } = {
    keyword: '',
    type: 'com_tax_code',
    action: undefined,
    status: undefined,
  };
  public listFilterType: IDropdown[] = [];
  public listActionFilter: IDropdown[] = [];
  public listStatus: IDropdown[] = [];

  constructor(
    private approveBusinessCustomerService: ApproveBusinessCustomerService
  ) {
    super();
  }

  ngOnInit() {
    // this.breadcrumbService.setItems([
    //   { label: 'Trang chủ', routerLink: ['/home'] },
    //   { label: 'Quản lý phê duyệt' },
    //   { label: 'Khách hàng doanh nghiệp' },
    // ] as MenuItem[]);
    this.headerService.setHeader('Phê duyệt khách hàng doanh nghiệp');

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
        fieldSort: 'id',
      },
      {
        field: 'action',
        header: 'Thao tác',
        width: '8rem',
        type: ETypeDataTable.STATUS,
        fieldStatus: {
          fieldLabel: 'action',
          fieldSeverity: 'actionSeverity',
        },
        posTextCell: EPositionTextCell.LEFT,
        isFrozen: true,
        posFrozen: EPositionFrozenCell.RIGHT,
      },
      {
        field: 'customer',
        header: 'Thông tin khách hàng',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'full_name',
        isResize: true,
      },
      {
        field: 'actionTime',
        header: 'Thời gian thao tác',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'action_dt',
        isResize: true,
      },
      {
        field: 'actionUser',
        header: 'Người thao tác',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'action_by',
        isResize: true,
      },
      {
        field: 'approveTime',
        header: 'Thời gian trình duyệt',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'approve_dt',
        isResize: true,
      },
      {
        field: 'approveUser',
        header: 'Người trình duyệt',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'approve_by',
        isResize: true,
      },
      {
        field: 'handleTime',
        header: 'Thời gian xử lý',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'handle_dt',
        isResize: true,
      },
      {
        field: 'handleUser',
        header: 'Người xử lý',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'handle_by',
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
    this.approveBusinessCustomerService._listFilterBusinessCustomer$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listFilterType = res;
        }
      }
    );
    this.approveBusinessCustomerService._listActionBusinessCustomer$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listActionFilter = res;
        }
      }
    );
    this.approveBusinessCustomerService._listStatusBusinessCustomer$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listStatus = res;
        }
      }
    );
  }

  private initData() {
    this.approveBusinessCustomerService.getListFilterBusinessCustomer();
    this.approveBusinessCustomerService.getListActionBusinessCustomer();
    this.approveBusinessCustomerService.getListStatusBusinessCustomer();
  }

  private genListAction() {
    this.listAction = this.dataSource.map(
      (data: ApproveBusinessCustomerModel) => {
        const actions: IActionTable[] = [];
        actions.push({
          data: data,
          label: 'Xem chi tiết',
          icon: 'pi pi-eye',
          command: ($event) => {
            this.detail($event.item.data);
          },
        });

        if (data.statusId === ApproveBusinessCustomerConst.KHOI_TAO) {
          actions.push({
            data: data,
            label: 'Trình duyệt',
            icon: 'pi pi-eye',
            command: ($event) => {
              this.approve($event.item.data);
            },
          });
        }
        if (data.statusId === ApproveBusinessCustomerConst.TRINH_DUYET) {
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
          data.statusId === ApproveBusinessCustomerConst.DA_DUYET ||
          data.statusId === ApproveBusinessCustomerConst.HUY_DUYET
        ) {
          actions.push({
            data: data,
            label: 'Lịch sử thay đổi',
            icon: 'pi pi-history',
            command: ($event) => {
              this.history($event.item.data);
            },
          });
        }
        return actions;
      }
    );
  }

  public approve(data: ApproveBusinessCustomerModel) {
    if (data) {
      this.dialogCommonService.createDialog(
        ConfirmNoteDialogComponent,
        'auto',
        'auto',
        true,
        {
          header: 'Trình duyệt khách hàng',
          content: 'Trình duyệt khách hàng',
          apiClickSaveDialog: (note: string, funcClose: () => void) => {
            this.approveBusinessCustomerService
              .approveBusinessCustomer(data.id, data.customerId, note || '')
              .subscribe((response) => {
                if (this.handleResponse(response)) {
                  this.toastService.showToastSucess(
                    'Trình duyệt khách hàng thành công!'
                  );
                  this.setPage();
                  funcClose();
                }
              });
          },
        } as IConfigDataConfirmNoteDialog
      );
    }
  }

  public request(data: ApproveBusinessCustomerModel) {
    if (data) {
      this.dialogCommonService.createDialog(
        ConfirmNoteDialogComponent,
        'auto',
        'auto',
        true,
        {
          labelAction: ['Từ chối', 'Chấp nhận'],
          header: 'Xử lý yêu cầu khách hàng',
          content: 'Xử lý yêu cầu khách hàng',
          apiClickSaveDialog: (note: string, funcClose: () => void) => {
            this.approveBusinessCustomerService
              .requestBusinessCustomer(
                'approved',
                data.id,
                data.customerId,
                note || ''
              )
              .subscribe((response) => {
                if (this.handleResponse(response)) {
                  this.toastService.showToastSucess(
                    'Xử lý yêu cầu khách hàng thành công!'
                  );
                  this.setPage();
                  funcClose();
                }
              });
          },
          apiClickCloseDialog: (note: string, funcClose: () => void) => {
            this.approveBusinessCustomerService
              .requestBusinessCustomer(
                'reject',
                data.id,
                data.customerId,
                note || ''
              )
              .subscribe((response) => {
                if (this.handleResponse(response)) {
                  this.toastService.showToastSucess(
                    'Xử lý yêu cầu khách hàng thành công!'
                  );
                  this.setPage();
                  funcClose();
                }
              });
          },
        } as IConfigDataConfirmNoteDialog
      );
    }
  }

  public detail(data: ApproveBusinessCustomerModel) {
    if (data) {
      this.routerService.routerNavigate([
        '/approve/approve-business-customer/' + data.customerId,
      ]);
    }
  }

  public history(data: ApproveBusinessCustomerModel) {
    if (data) {
      console.log('history');
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
    this.approveBusinessCustomerService
      .getListApproveBusinessCustomer(this.page, this.filter, this.sort)
      .subscribe(
        (res) => {
          this.spinnerService.removeSpinner();
          if (res.status === STATUS_RESPONSE.SUCCESS) {
            this.page.totalItems = res.recordsTotal;
            this.dataSource = res.data.map(
              (data: any) =>
                ({
                  no: data.stt,
                  id: data.id,
                  action: data.action,
                  actionSeverity: data.action_label,
                  customerId: data.custId,
                  customer: data.full_name,
                  actionTime: data.action_dt,
                  actionUser: data.action_by,
                  approveTime: data.approve_dt,
                  approveUser: data.approve_by,
                  handleTime: data.handle_dt,
                  handleUser: data.handle_by,
                  statusId: data.int_approve_st,
                  status: data.approve_st,
                  statusSeverity: data.approve_st_label,
                }) as ApproveBusinessCustomerModel
            );
            this.genListAction();
          }
        },
        (err) => {
          this.spinnerService.removeSpinner();
        }
      );
  }

  public onSort(event: ISortTable) {
    if (event) {
      this.sort = event;
      this.setPage();
    }
  }
}
