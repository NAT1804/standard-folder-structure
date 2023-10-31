import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApproveIndividualCustomerComponent } from './page/approve-individual-customer.component';

const routes: Routes = [
  {
    path: '',
    component: ApproveIndividualCustomerComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproveIndividualCustomerRoutingModule {}
