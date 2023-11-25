import { Component, Input, inject } from '@angular/core';
import { DialogCommonService } from '@app/shared/dialogs/dialog-common.service';
import { ApiConstantService } from '@app/shared/services/api-constant.service';
import { ToastService } from '@app/shared/services/toast.service';

@Component({
  selector: 'emir-base-common-component',
  templateUrl: './base-common-component.component.html',
  styleUrls: ['./base-common-component.component.scss'],
})
export class BaseCommonComponent {
  @Input()
  public isValidData = Boolean(false);
  @Input()
  public isSubmit = Boolean(false);
  @Input()
  public messageError = String('');
  public apiConstantService = inject(ApiConstantService);
  public toastService = inject(ToastService);
  public dialogCommonService = inject(DialogCommonService);

  constructor() {
    console.log('constructor');
  }
}
