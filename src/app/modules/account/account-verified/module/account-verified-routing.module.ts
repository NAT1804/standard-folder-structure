import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountVerifiedComponent } from './page/account-verified.component';

const routes: Routes = [
  {
    path: '',
    component: AccountVerifiedComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountVerifiedRoutingModule {}
