import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BusinessCustomerComponent } from './page/business-customer.component';
import { BusinessCustomerDetailComponent } from './page/business-customer-detail/business-customer-detail.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessCustomerComponent,
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
export class BusinessCustomerRoutingModule {}
