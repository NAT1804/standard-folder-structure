import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApproveBusinessCustomerComponent } from './page/approve-business-customer.component';
import { BusinessCustomerDetailComponent } from '@app/modules/customer/business-customer/module/page/business-customer-detail/business-customer-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ApproveBusinessCustomerComponent,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: BusinessCustomerDetailComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproveBusinessCustomerRoutingModule {}
