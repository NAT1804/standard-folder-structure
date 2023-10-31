import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingBusinessComponent } from './page/setting-business.component';

const routes: Routes = [
  {
    path: '',
    component: SettingBusinessComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingBusinessRoutingModule {}
