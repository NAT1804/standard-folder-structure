import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SEVERITY } from '@app/shared/constants/app.const';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';

@Component({
  selector: 'emir-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss'],
})
export class FormButtonComponent extends BaseCommonComponent {
  @Input()
  public classButton = String('');
  @Input()
  public styleClass = String('');
  @Input()
  public label = String('');
  @Input()
  public icon = String('');
  @Input()
  public iconPos: any = 'left';
  @Input()
  public isDisabled = Boolean(false);
  @Input()
  public severityButton = String(SEVERITY.PRIMARY);
  @Output()
  public _onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  public handleClick(event: any) {
    if (event && !this.isDisabled) {
      this._onClick.emit(event);
    }
  }

  public get severityClass() {
    return `p-button-${this.severityButton}`;
  }
}
