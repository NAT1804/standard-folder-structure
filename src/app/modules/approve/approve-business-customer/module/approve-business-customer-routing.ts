import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApproveBusinessCustomerComponent } from './page/approve-business-customer.component';

const routes: Routes = [
  {
    path: '',
    component: ApproveBusinessCustomerComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproveBusinessCustomerRoutingModule {}
