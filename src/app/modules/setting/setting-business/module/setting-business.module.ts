import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SettingBusinessRoutingModule } from './setting-business-routing';
import { SettingBusinessComponent } from './page/setting-business.component';

@NgModule({
  declarations: [SettingBusinessComponent],
  imports: [CommonModule, SharedModule, SettingBusinessRoutingModule],
})
export class SettingBusinessModule {}
