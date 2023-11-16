import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { CrudBusiCusDetailFileDialogComponent } from './crud-busi-cus-detail-file-dialog/crud-busi-cus-detail-file-dialog.component';
import { BusinessCustomerService } from '@app/modules/customer/business-customer/service/business-customer.service';
import {
  IActionTable,
  ICloseDialog,
  IHeaderColumn,
} from '@app/data/interfaces/interface';
import { BusinessCustomerDetailFileModel } from '@app/modules/customer/business-customer/model/BusinessCustomerDetailFile.model';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
  STATUS_RESPONSE,
} from '@app/shared/constants/app.const';

@Component({
  selector: 'ecore-business-customer-detail-file',
  templateUrl: './business-customer-detail-file.component.html',
  styleUrls: ['./business-customer-detail-file.component.scss'],
})
export class BusinessCustomerDetailFileComponent
  extends BaseComponent
  implements OnInit
{
  public headerColumns: IHeaderColumn[] = [];
  public dataSource: BusinessCustomerDetailFileModel[] = [];
  public isLoading: boolean;
  public listAction: IActionTable[][] = [];

  constructor(private businessCustomerService: BusinessCustomerService) {
    super();
  }

  ngOnInit() {
    this.headerColumns = this.headerColumns = [
      {
        field: 'no',
        header: '#ID',
        width: '3rem',
        type: ETypeDataTable.INDEX,
        posTextCell: EPositionTextCell.CENTER,
        isFrozen: true,
        posFrozen: EPositionFrozenCell.LEFT,
        fieldSort: 'id',
      },
      {
        field: 'fileName',
        header: 'Tên file',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isResize: true,
        fieldSort: 'bank_code',
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
    ];

    this.getData();
  }

  private getData() {
    if (this.businessCustomerService.businessCustomerId) {
      this.businessCustomerService
        .getBusiCusDetaiFile(this.businessCustomerService.businessCustomerId)
        .subscribe((res: any) => {
          this.spinnerService.removeSpinner();
          if (res.status === STATUS_RESPONSE.SUCCESS) {
            this.dataSource = res.data.map(
              (data: any, index: number) =>
                ({
                  id: data.id,
                  no: index,
                  fileName: data.meta_name,
                  fileSrc: data.meta_url,
                  fileNameSrc: data.meta_name_save,
                }) as BusinessCustomerDetailFileModel
            );
            this.genListAction();
          }
        });
    }
  }

  private genListAction() {
    this.listAction = this.dataSource.map(
      (data: BusinessCustomerDetailFileModel) => {
        const actions: IActionTable[] = [];

        actions.push({
          data: data,
          label: 'Xem chi tiết',
          icon: 'pi pi-eye',
          command: ($event) => {
            this.detail($event.item.data);
          },
        });

        actions.push({
          data: data,
          label: 'Tải file xuống',
          icon: 'pi pi-download',
          command: ($event) => {
            this.download($event.item.data);
          },
        });

        return actions;
      }
    );
  }

  public create(event: any) {
    if (event) {
      const modalRef = this.dialogCommonService.createDialog(
        CrudBusiCusDetailFileDialogComponent,
        '600px',
        'auto',
        true,
        {
          customerId: this.businessCustomerService.businessCustomerId,
        }
      );
      modalRef.onClose.subscribe((res: ICloseDialog) => {
        if (res?.status) {
          this.getData();
        }
      });
    }
  }

  public detail(data: BusinessCustomerDetailFileModel) {
    if (data) {
      this.businessCustomerService
        .getBusiCusDetailFileDetail(data.id)
        .subscribe((res: any) => {
          if (res.status === STATUS_RESPONSE.SUCCESS) {
            const modalRef = this.dialogCommonService.createDialog(
              CrudBusiCusDetailFileDialogComponent,
              '600px',
              'auto',
              true,
              {
                customerId: this.businessCustomerService.businessCustomerId,
                dataSource: res.data,
              }
            );
            modalRef.onClose.subscribe((res: ICloseDialog) => {
              if (res?.status) {
                this.getData();
              }
            });
          }
        });
    }
  }

  public download(data: BusinessCustomerDetailFileModel) {
    if (data) {
      if (data.fileSrc && data.fileSrc.length) {
        this.apiConstantService
          .downloadFile(data.fileSrc, data.fileNameSrc)
          .subscribe((res: any) => {
            if (res.status === STATUS_RESPONSE.SUCCESS) {
              this.toastService.showToastSucess('Tải file xuống thành công');
            } else {
              this.toastService.showToastError('Có lỗi khi tải file xuống');
            }
          });
      }
    }
  }
}
