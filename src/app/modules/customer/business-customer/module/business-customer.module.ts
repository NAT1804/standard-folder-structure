import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { BusinessCustomerComponent } from './page/business-customer.component';
import { BusinessCustomerRoutingModule } from './business-customer-routing';
import { BusinessCustomerDetailComponent } from './page/business-customer-detail/business-customer-detail.component';
import { BusinessCustomerDetailGeneralComponent } from './page/business-customer-detail/business-customer-detail-general/business-customer-detail-general.component';
import { CreateBusinessCustomerDialogComponent } from './page/create-business-customer-dialog/create-business-customer-dialog.component';
import { BusinessCustomerService } from '../service/business-customer.service';
import { BusinessCustomerDetailBankComponent } from './page/business-customer-detail/business-customer-detail-bank/business-customer-detail-bank.component';
import { CrudBusiCusDetailBankDialogComponent } from './page/business-customer-detail/business-customer-detail-bank/crud-busi-cus-detail-bank-dialog/crud-busi-cus-detail-bank-dialog.component';
import { BusinessCustomerDetailFileComponent } from './page/business-customer-detail/business-customer-detail-file/business-customer-detail-file.component';
import { CrudBusiCusDetailFileDialogComponent } from './page/business-customer-detail/business-customer-detail-file/crud-busi-cus-detail-file-dialog/crud-busi-cus-detail-file-dialog.component';

@NgModule({
  declarations: [
    BusinessCustomerComponent,
    BusinessCustomerDetailComponent,
    BusinessCustomerDetailGeneralComponent,
    CreateBusinessCustomerDialogComponent,
    BusinessCustomerDetailBankComponent,
    CrudBusiCusDetailBankDialogComponent,
    BusinessCustomerDetailFileComponent,
    CrudBusiCusDetailFileDialogComponent,
  ],
  imports: [CommonModule, SharedModule, BusinessCustomerRoutingModule],
  providers: [BusinessCustomerService],
})
export class BusinessCustomerModule {}
