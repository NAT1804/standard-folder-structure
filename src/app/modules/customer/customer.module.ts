import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerComponent } from './page/customer.component';
import { CustomerDetailComponent } from './page/customer-detail/customer-detail.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  declarations: [CustomerComponent, CustomerDetailComponent],
  imports: [CommonModule, CustomerRoutingModule],
})
export class CustomerModule {}
