import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { ApproveIndividualCustomerRoutingModule } from './approve-individual-customer-routing';
import { ApproveIndividualCustomerComponent } from './page/approve-individual-customer.component';
import { ApproveIndividualCustomerService } from '../service/approve-individual-customer.service';

@NgModule({
  declarations: [ApproveIndividualCustomerComponent],
  imports: [CommonModule, SharedModule, ApproveIndividualCustomerRoutingModule],
  providers: [ApproveIndividualCustomerService],
})
export class ApproveIndividualCustomerModule {}
