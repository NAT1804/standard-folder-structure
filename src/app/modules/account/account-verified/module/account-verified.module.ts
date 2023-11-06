import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountVerifiedRoutingModule } from './account-verified-routing.module';
import { AccountVerifiedComponent } from './page/account-verified.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [AccountVerifiedComponent],
  imports: [CommonModule, SharedModule, AccountVerifiedRoutingModule],
})
export class AccountVerifiedModule {}
