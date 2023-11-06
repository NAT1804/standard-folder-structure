import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { FlexNotificationComponent } from './page/flex-notification.component';
import { FlexNotificationRoutingModule } from './flex-notification-routing';

@NgModule({
  declarations: [FlexNotificationComponent],
  imports: [CommonModule, SharedModule, FlexNotificationRoutingModule],
})
export class FlexNotificationModule {}
