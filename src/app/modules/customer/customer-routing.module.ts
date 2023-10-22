import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CustomerDetailComponent } from './page/customer-detail/customer-detail.component';
import { CustomerComponent } from './page/customer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: CustomerDetailComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
