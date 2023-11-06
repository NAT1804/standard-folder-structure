import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingSignatureComponent } from './page/setting-signature.component';

const routes: Routes = [
  {
    path: '',
    component: SettingSignatureComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingSignatureRoutingModule {}
