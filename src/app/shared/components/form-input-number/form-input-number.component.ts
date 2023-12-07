import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';

@Component({
  selector: 'emir-form-input-number',
  templateUrl: './form-input-number.component.html',
  styleUrls: ['./form-input-number.component.scss'],
})
export class FormInputNumberComponent extends BaseCommonComponent {
  @Input()
  public classContainer = String('');
  @Input()
  public placeholder = String('');
  @Input()
  public ngModelValue: number | undefined = undefined;
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
  public classInput = String('');
  @Input()
  public showButtons = Boolean(false);
  @Input()
  public min: number;
  @Input()
  public max: number;
  @Input()
  public isNotMask = Boolean(false);
  @Output()
  public _onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public ngModelValueChange: EventEmitter<number | undefined> =
    new EventEmitter<number | undefined>();

  constructor() {
    super();
  }

  public handleInput(event: any) {
    if (event) {
      this.ngModelValueChange.emit(event.value);
    }
  }
}
