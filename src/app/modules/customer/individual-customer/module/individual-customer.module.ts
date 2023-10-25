import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { IndividualCustomerRoutingModule } from './individual-customer-routing';
import { IndividualCustomerComponent } from './page/individual-customer.component';

@NgModule({
  declarations: [IndividualCustomerComponent],
  imports: [CommonModule, SharedModule, IndividualCustomerRoutingModule],
})
export class IndividualCustomerModule {}
