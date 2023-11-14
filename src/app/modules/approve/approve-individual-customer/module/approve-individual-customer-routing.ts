import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApproveIndividualCustomerComponent } from './page/approve-individual-customer.component';
import { IndividualCustomerDetailComponent } from '@app/modules/customer/individual-customer/module/page/individual-customer-detail/individual-customer-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ApproveIndividualCustomerComponent,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: IndividualCustomerDetailComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproveIndividualCustomerRoutingModule {}
