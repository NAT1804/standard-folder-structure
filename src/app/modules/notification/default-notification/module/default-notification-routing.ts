import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DefaultNotificationComponent } from './page/default-notification.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultNotificationComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultNotificationRoutingModule {}
