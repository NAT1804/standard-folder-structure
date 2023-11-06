import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndividualCustomerComponent } from './page/individual-customer.component';
import { IndividualCustomerDetailComponent } from './page/individual-customer-detail/individual-customer-detail.component';

const routes: Routes = [
  {
    path: '',
    component: IndividualCustomerComponent,
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
export class IndividualCustomerRoutingModule {}
