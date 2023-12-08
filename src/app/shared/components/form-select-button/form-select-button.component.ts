import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISelectButton } from '@app/data/interfaces/interface';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';

@Component({
  selector: 'emir-form-select-button',
  templateUrl: './form-select-button.component.html',
  styleUrls: ['./form-select-button.component.scss'],
})
export class FormSelectButtonComponent extends BaseCommonComponent {
  @Input()
  public classContainer = String('');
  @Input()
  public options: ISelectButton[] = [];
  @Input()
  public classSelectButton = String('');
  @Input()
  public ngModelValue: any;
  @Input()
  public isDisabled = Boolean(false);
  @Output()
  public ngModelValueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public _onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  public handleChange(event: any) {
    if (event) {
      this.ngModelValueChange.emit(event.value);
      this._onChange.emit(event);
    }
  }
}
