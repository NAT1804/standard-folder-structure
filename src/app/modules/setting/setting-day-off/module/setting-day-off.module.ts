import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { SettingDayOffService } from '../service/setting-day-off.service';
import { SettingDayOffComponent } from './page/setting-day-off.component';
import { SettingDayOffRoutingModule } from './setting-day-off-routing';

@NgModule({
  declarations: [SettingDayOffComponent],
  imports: [CommonModule, SharedModule, SettingDayOffRoutingModule],
  providers: [SettingDayOffService],
})
export class SettingDayOffModule {}
