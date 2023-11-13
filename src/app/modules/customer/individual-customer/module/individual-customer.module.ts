import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { IndividualCustomerRoutingModule } from './individual-customer-routing';
import { IndividualCustomerComponent } from './page/individual-customer.component';
import { IndividualCustomerDetailComponent } from './page/individual-customer-detail/individual-customer-detail.component';
import { IndividualCustomerDetailGeneralComponent } from './page/individual-customer-detail/individual-customer-detail-general/individual-customer-detail-general.component';
import { IndividualCustomerDetailBankComponent } from './page/individual-customer-detail/individual-customer-detail-bank/individual-customer-detail-bank.component';
import { IndividualCustomerDetailContactComponent } from './page/individual-customer-detail/individual-customer-detail-contact/individual-customer-detail-contact.component';
import { IndividualCustomerDetailVerifyComponent } from './page/individual-customer-detail/individual-customer-detail-verify/individual-customer-detail-verify.component';
import { IndividualCustomerDetailSaleComponent } from './page/individual-customer-detail/individual-customer-detail-sale/individual-customer-detail-sale.component';
import { CreateIndividualCustomerDialogComponent } from './page/create-individual-customer-dialog/create-individual-customer-dialog.component';
import { IndividualCustomerService } from '../service/individual-customer.service';
import { CrudIndiCusDetailBankDialogComponent } from './page/individual-customer-detail/individual-customer-detail-bank/crud-indi-cus-detail-bank-dialog/crud-indi-cus-detail-bank-dialog.component';
import { CrudIndiCusDetailContactDialogComponent } from './page/individual-customer-detail/individual-customer-detail-contact/crud-indi-cus-detail-contact-dialog/crud-indi-cus-detail-contact-dialog.component';
import { CrudIndiCusDetailSaleDialogComponent } from './page/individual-customer-detail/individual-customer-detail-sale/crud-indi-cus-detail-sale-dialog/crud-indi-cus-detail-sale-dialog.component';
import { CrudIndiCusDetailVerifyDialogComponent } from './page/individual-customer-detail/individual-customer-detail-verify/crud-indi-cus-detail-verify-dialog/crud-indi-cus-detail-verify-dialog.component';

@NgModule({
  declarations: [
    IndividualCustomerComponent,
    IndividualCustomerDetailComponent,
    IndividualCustomerDetailGeneralComponent,
    IndividualCustomerDetailBankComponent,
    IndividualCustomerDetailContactComponent,
    IndividualCustomerDetailVerifyComponent,
    IndividualCustomerDetailSaleComponent,
    CreateIndividualCustomerDialogComponent,
    CrudIndiCusDetailBankDialogComponent,
    CrudIndiCusDetailContactDialogComponent,
    CrudIndiCusDetailSaleDialogComponent,
    CrudIndiCusDetailVerifyDialogComponent,
  ],
  imports: [CommonModule, SharedModule, IndividualCustomerRoutingModule],
  providers: [IndividualCustomerService],
})
export class IndividualCustomerModule {}
