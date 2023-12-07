import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';

@Component({
  selector: 'emir-form-input-switch',
  templateUrl: './form-input-switch.component.html',
  styleUrls: ['./form-input-switch.component.scss'],
})
export class FormInputSwitchComponent extends BaseCommonComponent {
  @Input()
  public classContainer = String('flex align-items-end');
  @Input()
  public ngModelValue: any = undefined;
  @Input()
  public showLabel = Boolean(true);
  @Input()
  public isDisabled = Boolean(false);
  @Input()
  public isRequired = Boolean(false);
  @Input()
  public label = String('');
  @Input()
  public classLabel = String('');
  @Input()
  public trueValue: any = true;
  @Input()
  public falseValue: any = false;
  @Output()
  public ngModelValueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  public onChange(event: any) {
    if (event) {
      this.ngModelValueChange.emit(this.ngModelValue);
    }
  }
}
