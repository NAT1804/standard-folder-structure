import { Component, Input } from '@angular/core';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';

@Component({
  selector: 'emir-form-label',
  templateUrl: './form-label.component.html',
  styleUrls: ['./form-label.component.scss'],
})
export class FormLabelComponent extends BaseCommonComponent {
  @Input()
  public showLabel = Boolean(true);
  @Input()
  public label = String('');
  @Input()
  public classLabel = String('');
  @Input()
  public isRequired = Boolean(false);

  constructor() {
    super();
  }
}
