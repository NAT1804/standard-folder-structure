import { Component, OnInit } from '@angular/core';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';
import { SpinnerService } from '@app/shared/services/spinner.service';

@Component({
  selector: 'emir-form-spinner-loading',
  templateUrl: './form-spinner-loading.component.html',
  styleUrls: ['./form-spinner-loading.component.scss'],
})
export class FormSpinnerLoadingComponent
  extends BaseCommonComponent
  implements OnInit
{
  constructor(public spinnerService: SpinnerService) {
    super();
  }

  ngOnInit() {
    console.log('ngOnInit');
  }
}
