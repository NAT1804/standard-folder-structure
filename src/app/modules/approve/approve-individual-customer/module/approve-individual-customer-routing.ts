import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndividualCustomerDetailComponent } from '@app/modules/customer/individual-customer/module/page/individual-customer-detail/individual-customer-detail.component';
import { ApproveIndividualCustomerComponent } from './page/approve-individual-customer.component';

const routes: Routes = [
  {
    path: '',
    component: ApproveIndividualCustomerComponent,
    pathMatch: 'full',
  },
  {
    path: ':id/:approveId',
    component: IndividualCustomerDetailComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproveIndividualCustomerRoutingModule {}
