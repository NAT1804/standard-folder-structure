import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { BusinessCustomerComponent } from './page/business-customer.component';
import { BusinessCustomerRoutingModule } from './business-customer-routing';
import { BusinessCustomerDetailComponent } from './page/business-customer-detail/business-customer-detail.component';
import { BusinessCustomerDetailGeneralComponent } from './page/business-customer-detail/business-customer-detail-general/business-customer-detail-general.component';

@NgModule({
  declarations: [
    BusinessCustomerComponent,
    BusinessCustomerDetailComponent,
    BusinessCustomerDetailGeneralComponent,
  ],
  imports: [CommonModule, SharedModule, BusinessCustomerRoutingModule],
})
export class BusinessCustomerModule {}
