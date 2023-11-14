import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiConstantService } from '../services/api-constant.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'emir-base-dialog',
  template: '',
})
export class BaseDialogComponent {
  public dynamicDialogRef = inject(DynamicDialogRef);
  public dynamicDialogConfig = inject(DynamicDialogConfig);
  public apiConstantService = inject(ApiConstantService);
  public toastService = inject(ToastService);
  public isSubmit = Boolean(false);
}
