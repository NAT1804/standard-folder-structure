import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { ApproveBusinessCustomerService } from '../service/approve-business-customer.service';
import { ApproveBusinessCustomerRoutingModule } from './approve-business-customer-routing';
import { ApproveBusinessCustomerComponent } from './page/approve-business-customer.component';

@NgModule({
  declarations: [ApproveBusinessCustomerComponent],
  imports: [CommonModule, SharedModule, ApproveBusinessCustomerRoutingModule],
  providers: [ApproveBusinessCustomerService],
})
export class ApproveBusinessCustomerModule {}
