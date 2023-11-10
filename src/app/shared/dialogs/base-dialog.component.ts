import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'emir-base-dialog',
  template: '',
})
export class BaseDialogComponent {
  public dynamicDialogRef = inject(DynamicDialogRef);
  public dynamicDialogConfig = inject(DynamicDialogConfig);
  public isSubmit = Boolean(false);
}
