import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingDayOffComponent } from './page/setting-day-off.component';

const routes: Routes = [
  {
    path: '',
    component: SettingDayOffComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingDayOffRoutingModule {}
