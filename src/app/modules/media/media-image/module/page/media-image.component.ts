import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  IActionTable,
  IDropdown,
  IHeaderColumn,
  ISortTable,
  IValueFormatter,
} from '@app/data/interfaces/interface';
import { Page } from '@app/data/model/page';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
  ETypeFormatDate,
  STATUS_RESPONSE,
} from '@app/shared/constants/app.const';
import { formatDate } from '@app/shared/function-common';
import { MediaImageModel } from '../../model/MediaImage.model';
import { MediaImageService } from '../../service/media.service';
import { CrudMediaImageDialogComponent } from './crud-media-image-dialog/crud-media-image-dialog.component';

@Component({
  selector: 'emir-media-image',
  templateUrl: './media-image.component.html',
  styleUrls: ['./media-image.component.scss'],
})
export class MediaImageComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  public headerColumns: IHeaderColumn[] = [];
  public dataSource: MediaImageModel[] = [];
  public isLoading: boolean;
  public listAction: IActionTable[][] = [];
  public page: Page = new Page();
  public sort: ISortTable;
  public filter: {
    keyword: string;
    page: string | undefined;
    position: string | undefined;
    status: string | undefined;
  } = {
    keyword: '',
    page: undefined,
    position: undefined,
    status: undefined,
  };
  public listPage: IDropdown[] = [];
  public listPosition: IDropdown[] = [];
  public listStatus: IDropdown[] = [];
  public listOutstanding: IDropdown[] = [];
  public listRedirectType: IDropdown[] = [];
  public listRedirectLevel1: IDropdown[] = [];

  constructor(private mediaImageService: MediaImageService) {
    super();
  }

  ngOnInit() {
    this.headerService.setHeader('Danh sách hình ảnh');

    this.headerColumns = [
      {
        field: 'no',
        header: 'STT',
        width: '3rem',
        type: ETypeDataTable.INDEX,
        posTextCell: EPositionTextCell.CENTER,
        isFrozen: true,
        posFrozen: EPositionFrozenCell.LEFT,
        isSort: true,
        fieldSort: 'no',
      },
      {
        field: 'title',
        header: 'Tiêu đề hình ảnh',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'title',
        isResize: true,
      },
      {
        field: 'page',
        header: 'Trang',
        minWidth: '8rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'app_page',
        isResize: true,
      },
      {
        field: 'position',
        header: 'Vị trí',
        minWidth: '8rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'position_page',
        isResize: true,
      },
      {
        field: 'postUser',
        header: 'Người đăng',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'created_by',
        isResize: true,
      },
      {
        field: 'postTime',
        header: 'Thời gian đăng',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'created',
        isResize: true,
        valueFormatter: (param: IValueFormatter) =>
          param.data ? formatDate(param.data, ETypeFormatDate.DATE_TIME) : '',
      },
      {
        field: 'approveUser',
        header: 'Người duyệt',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'approved_by',
        isResize: true,
      },
      {
        field: 'approveTime',
        header: 'Thời gian duyệt',
        minWidth: '10rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'approved',
        isResize: true,
        valueFormatter: (param: IValueFormatter) =>
          param.data ? formatDate(param.data, ETypeFormatDate.DATE_TIME) : '',
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
    this.mediaImageService._listPageMediaImage$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listPage = res;
        }
      }
    );
    this.mediaImageService._listPositionMediaImage$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listPosition = res;
        }
      }
    );
    this.mediaImageService._listStatusMediaImage$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listStatus = res;
        }
      }
    );
    this.mediaImageService._listStatusMediaImage$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listStatus = res;
        }
      }
    );
    this.mediaImageService._listOutstandingMediaImage$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listOutstanding = res;
        }
      }
    );
    this.mediaImageService._listRedirectType$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listRedirectType = res;
        }
      }
    );
    this.mediaImageService._listRedirectLevel1$.subscribe(
      (res: IDropdown[] | undefined) => {
        if (res) {
          this.listRedirectLevel1 = res;
        }
      }
    );
  }

  private initData() {
    this.mediaImageService.getListPageMediaImage();
    this.mediaImageService.getListStatusMediaImage();
    this.mediaImageService.getListOutstandingMediaImage();
    this.mediaImageService.getListRedirectType();
    this.mediaImageService.getListRedirectLevel1();
  }

  private genListAction() {
    this.listAction = this.dataSource.map((data: MediaImageModel) => {
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

  public detail(data: MediaImageModel) {
    if (data) {
      this.mediaImageService
        .getMediaImageDetail(data.id)
        .subscribe((res: any) => {
          if (res.status === STATUS_RESPONSE.SUCCESS) {
            const modalRef = this.dialogCommonService.createDialog(
              CrudMediaImageDialogComponent,
              '100%',
              '100%',
              true,
              {
                listPage: this.listPage,
                listOutstanding: this.listOutstanding,
                listRedirectType: this.listRedirectType,
                listRedirectLevel1: this.listRedirectLevel1,
                dataSource: res.data,
              }
            );
            modalRef.onClose.subscribe((res) => {
              if (res?.status) {
                this.setPage();
              }
            });
          }
        });
    }
  }

  public create(event: any) {
    if (event) {
      const modalRef = this.dialogCommonService.createDialog(
        CrudMediaImageDialogComponent,
        '100%',
        '100%',
        true,
        {
          listPage: this.listPage,
          listOutstanding: this.listOutstanding,
          listRedirectType: this.listRedirectType,
          listRedirectLevel1: this.listRedirectLevel1,
        }
      );
      modalRef.onClose.subscribe((res) => {
        if (res?.status) {
          this.setPage();
        }
      });
    }
  }

  public changeFilter(event: any, key?: string) {
    if (key === 'page') {
      this.listPosition = [];
      this.filter.position = undefined;
      if (this.filter.page) {
        this.mediaImageService.getListPositionMediaImage(this.filter.page);
      }
    }
    this.setPage();
  }

  private setPage() {
    this.spinnerService.showSpinner();
    this.mediaImageService
      .getListMediaImage(this.page, this.filter, this.sort)
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
                  title: data.title,
                  page: data.app_page,
                  position: data.position_page,
                  postUser: data.created_by,
                  postTime: data.created,
                  approveUser: data.approved_by,
                  approveTime: data.approved,
                  status: data.media_st,
                  statusSeverity: data.media_st_label,
                }) as MediaImageModel
            );
            this.genListAction();
          }
        },
        (err) => {
          this.spinnerService.removeSpinner();
        }
      );
  }

  public changePage(event: any) {
    if (event) {
      this.setPage();
    }
  }

  public onSort(event: ISortTable) {
    if (event) {
      this.sort = event;
      this.setPage();
    }
  }
}
