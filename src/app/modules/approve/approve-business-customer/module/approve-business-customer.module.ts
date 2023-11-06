import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { ApproveBusinessCustomerRoutingModule } from './approve-business-customer-routing';
import { ApproveBusinessCustomerComponent } from './page/approve-business-customer.component';

@NgModule({
  declarations: [ApproveBusinessCustomerComponent],
  imports: [CommonModule, SharedModule, ApproveBusinessCustomerRoutingModule],
})
export class ApproveBusinessCustomerModule {}
