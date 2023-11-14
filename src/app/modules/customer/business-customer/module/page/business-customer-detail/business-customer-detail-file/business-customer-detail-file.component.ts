import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { CrudBusiCusDetailFileDialogComponent } from './crud-busi-cus-detail-file-dialog/crud-busi-cus-detail-file-dialog.component';
import { BusinessCustomerService } from '@app/modules/customer/business-customer/service/business-customer.service';
import { ICloseDialog } from '@app/data/interfaces/interface';

@Component({
  selector: 'ecore-business-customer-detail-file',
  templateUrl: './business-customer-detail-file.component.html',
  styleUrls: ['./business-customer-detail-file.component.scss'],
})
export class BusinessCustomerDetailFileComponent
  extends BaseComponent
  implements OnInit
{
  constructor(private businessCustomerService: BusinessCustomerService) {
    super();
  }

  ngOnInit() {
    console.log('ngOnInit');
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
          // this.getData();
        }
      });
    }
  }
}
