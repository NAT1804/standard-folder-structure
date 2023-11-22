import { Component, OnInit } from '@angular/core';
import { IActionTable, IHeaderColumn } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
  ETypeStatus,
} from '@app/shared/constants/app.const';
import { MediaImageModel } from '../../model/MediaImage.model';
import { MediaImageConst } from '../../service/media-image.const';
import { CrudMediaImageDialogComponent } from './crud-media-image-dialog/crud-media-image-dialog.component';

@Component({
  selector: 'emir-media-image',
  templateUrl: './media-image.component.html',
  styleUrls: ['./media-image.component.scss'],
})
export class MediaImageComponent extends BaseComponent implements OnInit {
  public headerColumns: IHeaderColumn[] = [];
  public dataSource: MediaImageModel[] = [];
  public isLoading: boolean;
  public listAction: IActionTable[][] = [];

  public get listStatus() {
    return MediaImageConst.listStatus;
  }

  public getStatusSeverity(code: number) {
    return MediaImageConst.getStatus(code, ETypeStatus.SEVERITY);
  }

  public getStatusName(code: number) {
    return MediaImageConst.getStatus(code, ETypeStatus.LABEL);
  }

  constructor() {
    super();
  }

  ngOnInit() {
    // this.breadcrumbService.setItems([
    //   { label: 'Trang chủ', routerLink: ['/home'] },
    //   { label: 'Truyền thông' },
    //   { label: 'Hình ảnh' },
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
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'page',
        isResize: true,
      },
      {
        field: 'position',
        header: 'Vị trí',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'position',
        isResize: true,
      },
      {
        field: 'postUser',
        header: 'Người đăng',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'postUser',
        isResize: true,
      },
      {
        field: 'postTime',
        header: 'Thời gian đăng',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'postTime',
        isResize: true,
      },
      {
        field: 'approveUser',
        header: 'Người duyệt',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'approveUser',
        isResize: true,
      },
      {
        field: 'approveTime',
        header: 'Thời gian duyệt',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'approveTime',
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
        title: '1',
        page: '1',
        position: '1',
        postUser: '1',
        postTime: '1',
        approveUser: '1',
        approveTime: '1',
        status: 1,
      },
      {
        id: 2,
        title: '2',
        page: '2',
        position: '2',
        postUser: '2',
        postTime: '2',
        approveUser: '2',
        approveTime: '2',
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
    // this.listAction = this.dataSource.map((data: BusinessCustomerModel) => {
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

  // public detail(data: BusinessCustomerModel) {
  //   if (data) {
  //     this.routerService.routerNavigate([
  //       'customer/business-customer/' + data.id,
  //     ]);
  //   }
  // }

  public create(event: any) {
    if (event) {
      const modalRef = this.dialogCommonService.createDialog(
        CrudMediaImageDialogComponent,
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
