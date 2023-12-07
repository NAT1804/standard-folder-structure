import { Component } from '@angular/core';
import { SpinnerService } from '@app/shared/services/spinner.service';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';

@Component({
  selector: 'emir-form-spinner-loading',
  templateUrl: './form-spinner-loading.component.html',
  styleUrls: ['./form-spinner-loading.component.scss'],
})
export class FormSpinnerLoadingComponent extends BaseCommonComponent {
  constructor(public spinnerService: SpinnerService) {
    super();
  }
}
