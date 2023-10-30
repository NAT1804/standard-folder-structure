import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { DefaultNotificationComponent } from './page/default-notification.component';
import { DefaultNotificationRoutingModule } from './default-notification-routing';

@NgModule({
  declarations: [DefaultNotificationComponent],
  imports: [CommonModule, SharedModule, DefaultNotificationRoutingModule],
})
export class DefaultNotificationModule {}
