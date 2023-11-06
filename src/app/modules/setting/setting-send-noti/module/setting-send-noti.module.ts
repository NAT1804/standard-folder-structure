import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SettingSendNotiRoutingModule } from './setting-send-noti-routing';
import { SettingSendNotiComponent } from './page/setting-send-noti.component';

@NgModule({
  declarations: [SettingSendNotiComponent],
  imports: [CommonModule, SharedModule, SettingSendNotiRoutingModule],
})
export class SettingSendNotiModule {}
