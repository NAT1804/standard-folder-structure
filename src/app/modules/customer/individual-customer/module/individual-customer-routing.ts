import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndividualCustomerComponent } from './page/individual-customer.component';

const routes: Routes = [
  {
    path: '',
    component: IndividualCustomerComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndividualCustomerRoutingModule {}
