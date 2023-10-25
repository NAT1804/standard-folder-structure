import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { commonComponents, commonModules, pipes } from '.';

@NgModule({
  declarations: [...commonComponents, ...pipes],
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
  ],
})
export class SharedModule {}
