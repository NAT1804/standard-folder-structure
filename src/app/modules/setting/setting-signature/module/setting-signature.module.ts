import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SettingSignatureComponent } from './page/setting-signature.component';
import { SettingSignatureRoutingModule } from './setting-signature-routing';

@NgModule({
  declarations: [SettingSignatureComponent],
  imports: [CommonModule, SharedModule, SettingSignatureRoutingModule],
})
export class SettingSignatureModule {}
