import { Component, OnInit } from '@angular/core';
import {
  IActionTable,
  ICloseDialog,
  IHeaderColumn,
} from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { IndividualCustomerDetailContactModel } from '@app/modules/customer/individual-customer/model/IndividualCustomerDetailContact.model';
import { IndividualCustomerService } from '@app/modules/customer/individual-customer/service/individual-customer.service';
import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
  SEVERITY,
  STATUS_RESPONSE,
} from '@app/shared/constants/app.const';
import { CrudIndiCusDetailContactDialogComponent } from './crud-indi-cus-detail-contact-dialog/crud-indi-cus-detail-contact-dialog.component';

@Component({
  selector: 'ecore-individual-customer-detail-contact',
  templateUrl: './individual-customer-detail-contact.component.html',
  styleUrls: ['./individual-customer-detail-contact.component.scss'],
})
export class IndividualCustomerDetailContactComponent
  extends BaseComponent
  implements OnInit
{
  public headerColumns: IHeaderColumn[] = [];
  public dataSource: IndividualCustomerDetailContactModel[] = [];
  public isLoading: boolean;
  public listAction: IActionTable[][] = [];

  constructor(private individualCustomerService: IndividualCustomerService) {
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
        isSort: true,
        fieldSort: 'id',
      },
      {
        field: 'contactName',
        header: 'Tên địa chỉ liên hệ',
        minWidth: '20rem',
        type: ETypeDataTable.TEXT,
        isSort: true,
        fieldSort: 'contact_address',
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
    ];

    this.getData();
  }

  public funcStyleClassStatus = (status: boolean) => {
    return status ? SEVERITY.INFO : '';
  };

  public funcLabelStatus = (status: boolean) => {
    return status ? 'Mặc định' : '';
  };

  private getData() {
    if (this.individualCustomerService.individualCustomerId) {
      this.individualCustomerService
        .getIndiCusDetailContact(
          this.individualCustomerService.individualCustomerId
        )
        .subscribe((res: any) => {
          this.spinnerService.removeSpinner();
          if (res.status === STATUS_RESPONSE.SUCCESS) {
            this.dataSource = res.data.map(
              (data: any, index: number) =>
                ({
                  no: index,
                  id: data.id,
                  contactName: data.contact_address,
                  status: data.is_default,
                }) as IndividualCustomerDetailContactModel
            );
            this.genListAction();
          }
        });
    }
  }

  private genListAction() {
    this.listAction = this.dataSource.map(
      (data: IndividualCustomerDetailContactModel) => {
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
      }
    );
  }

  public create(event: any) {
    if (event) {
      const modalRef = this.dialogCommonService.createDialog(
        CrudIndiCusDetailContactDialogComponent,
        '600px',
        'auto',
        true,
        {
          customerId: this.individualCustomerService.individualCustomerId,
        }
      );
      modalRef.onClose.subscribe((res: ICloseDialog) => {
        if (res?.status) {
          this.getData();
        }
      });
    }
  }

  public detail(data: IndividualCustomerDetailContactModel) {
    if (data) {
      this.individualCustomerService
        .getIndiCusDetailContactDetail(data.id)
        .subscribe((res: any) => {
          if (res.status === STATUS_RESPONSE.SUCCESS) {
            const modalRef = this.dialogCommonService.createDialog(
              CrudIndiCusDetailContactDialogComponent,
              '600px',
              'auto',
              true,
              {
                customerId: this.individualCustomerService.individualCustomerId,
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
}
