import { Component, inject } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'emir-base-dialog',
  template: '',
})
export class BaseDialogComponent {
  public dynamicDialogRef = inject(DynamicDialogRef);
  public isSubmit = Boolean(false);
}
