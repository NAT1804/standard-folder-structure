import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  commonComponents,
  commonDialogs,
  commonModules,
  directives,
  pipes,
  services,
} from '.';

@NgModule({
  declarations: [
    ...commonComponents,
    ...commonDialogs,
    ...pipes,
    ...directives,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...commonModules,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...commonModules,
    ...commonComponents,
    ...commonDialogs,
    ...directives,
  ],
  providers: [...services],
})
export class SharedModule {}
