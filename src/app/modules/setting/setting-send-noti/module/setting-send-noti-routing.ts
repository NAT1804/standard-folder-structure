import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingSendNotiComponent } from './page/setting-send-noti.component';

const routes: Routes = [
  {
    path: '',
    component: SettingSendNotiComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingSendNotiRoutingModule {}
