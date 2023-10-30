import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexNotificationComponent } from './page/flex-notification.component';

const routes: Routes = [
  {
    path: '',
    component: FlexNotificationComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlexNotificationRoutingModule {}
