import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MIN_HEIGHT_RESIZE_TEXTAREA,
  RESIZE_TEXTAREA_TYPE,
} from '@app/shared/constants/app.const';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';

@Component({
  selector: 'emir-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss'],
})
export class FormTextareaComponent extends BaseCommonComponent {
  @Input()
  public classContainer = String('');
  @Input()
  public classLabel = String('');
  @Input()
  public showLabel = Boolean(true);
  @Input()
  public label = String('');
  @Input()
  public rows = Number(2);
  @Input()
  public ngModelValue: string | undefined = undefined;
  @Input()
  public placeholder = String('');
  @Input()
  public classTextarea = String('');
  @Input()
  public isRequired = Boolean(false);
  @Input()
  public isDisabled = Boolean(false);
  @Input()
  public resizeTextareaType: string = RESIZE_TEXTAREA_TYPE.VERTICAL;
  @Output()
  public _onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public _onChangeKeyup: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public _onChangeInput: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public ngModelValueChange: EventEmitter<string | undefined> =
    new EventEmitter<string | undefined>();

  constructor() {
    super();
  }

  public handleClick(event: any) {
    if (event) {
      this._onClick.emit(event);
    }
  }

  public handleKeyup(event: any) {
    if (event) {
      this._onChangeKeyup.emit(event);
    }
  }

  public handleInput(event: any) {
    if (event) {
      this.ngModelValueChange.emit(event.target.value);
      this._onChangeInput.emit(event);
    }
  }

  public get MIN_HEIGHT_RESIZE_TEXTAREA() {
    return MIN_HEIGHT_RESIZE_TEXTAREA;
  }
}
