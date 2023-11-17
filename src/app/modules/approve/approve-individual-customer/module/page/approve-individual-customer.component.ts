import { AfterViewInit, Component, OnInit } from '@angular/core';
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
import { MenuItem } from 'primeng/api';
import { ApproveIndividualCustomerModel } from '../../model/ApproveIndividualCustomer.model';
import { ApproveIndividualCustomerConst } from '../../service/approve-individual-customer.const';
import { ApproveIndividualCustomerService } from '../../service/approve-individual-customer.service';

@Component({
  selector: 'emir-approve-individual-customer',
  templateUrl: './approve-individual-customer.component.html',
  styleUrls: ['./approve-individual-customer.component.scss'],
})
export class ApproveIndividualCustomerComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  public headerColumns: IHeaderColumn[] = [];
  public dataSource: ApproveIndividualCustomerModel[] = [];
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
    type: 'cif_no',
    action: undefined,
    status: undefined,
  };
  public listFilterType: IDropdown[] = [];
  public listActionFilter: IDropdown[] = [];
  public listStatus: IDropdown[] = [];

  constructor(
    private approveIndividualCustomerService: ApproveIndividualCustomerService
  ) {
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
    this.approveIndividualCustomerService._listFilterIndividualCustomer$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listFilterType = res;
        }
      }
    );
    this.approveIndividualCustomerService._listActionIndividualCustomer$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listActionFilter = res;
        }
      }
    );
    this.approveIndividualCustomerService._listStatusIndividualCustomer$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listStatus = res;
        }
      }
    );
  }

  private initData() {
    this.approveIndividualCustomerService.getListFilterIndividualCustomer();
    this.approveIndividualCustomerService.getListActionIndividualCustomer();
    this.approveIndividualCustomerService.getListStatusIndividualCustomer();
  }

  private genListAction() {
    this.listAction = this.dataSource.map(
      (data: ApproveIndividualCustomerModel) => {
        const actions: IActionTable[] = [];
        actions.push({
          data: data,
          label: 'Xem chi tiết',
          icon: 'pi pi-eye',
          command: ($event) => {
            this.detail($event.item.data);
          },
        });

        if (data.statusId === ApproveIndividualCustomerConst.KHOI_TAO) {
          actions.push({
            data: data,
            label: 'Trình duyệt',
            icon: 'pi pi-eye',
            command: ($event) => {
              this.approve($event.item.data);
            },
          });
        }
        if (data.statusId === ApproveIndividualCustomerConst.TRINH_DUYET) {
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
          data.statusId === ApproveIndividualCustomerConst.DA_DUYET ||
          data.statusId === ApproveIndividualCustomerConst.HUY_DUYET
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

  public approve(data: ApproveIndividualCustomerModel) {
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
            this.approveIndividualCustomerService
              .approveIndividualCustomer(data.id, data.customerId, note || '')
              .subscribe((response) => {
                if (response.status === STATUS_RESPONSE.SUCCESS) {
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

  public request(data: ApproveIndividualCustomerModel) {
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
            this.approveIndividualCustomerService
              .requestIndividualCustomer(
                'approved',
                data.id,
                data.customerId,
                note || ''
              )
              .subscribe((response) => {
                if (response.status === STATUS_RESPONSE.SUCCESS) {
                  this.toastService.showToastSucess(
                    'Xử lý yêu cầu khách hàng thành công!'
                  );
                  this.setPage();
                  funcClose();
                }
              });
          },
          apiClickCloseDialog: (note: string, funcClose: () => void) => {
            this.approveIndividualCustomerService
              .requestIndividualCustomer(
                'reject',
                data.id,
                data.customerId,
                note || ''
              )
              .subscribe((response) => {
                if (response.status === STATUS_RESPONSE.SUCCESS) {
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

  public detail(data: ApproveIndividualCustomerModel) {
    if (data) {
      this.routerService.routerNavigate([
        '/approve/approve-individual-customer/' + data.customerId,
      ]);
    }
  }

  public history(data: ApproveIndividualCustomerModel) {
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
    this.approveIndividualCustomerService
      .getListApproveIndividualCustomer(this.page, this.filter, this.sort)
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
                }) as ApproveIndividualCustomerModel
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
