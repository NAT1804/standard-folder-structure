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

@NgModule({
  declarations: [
    IndividualCustomerComponent,
    IndividualCustomerDetailComponent,
    IndividualCustomerDetailGeneralComponent,
    IndividualCustomerDetailBankComponent,
    IndividualCustomerDetailContactComponent,
    IndividualCustomerDetailVerifyComponent,
    IndividualCustomerDetailSaleComponent,
  ],
  imports: [CommonModule, SharedModule, IndividualCustomerRoutingModule],
})
export class IndividualCustomerModule {}
