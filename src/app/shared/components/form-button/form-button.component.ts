import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';

@Component({
  selector: 'emir-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss'],
})
export class FormButtonComponent extends BaseCommonComponent implements OnInit {
  @Input()
  public classButton = String('');
  @Input()
  public styleClassButton = String('');
  @Input()
  public label = String('');
  @Input()
  public icon = String('');
  @Input()
  public iconPos: any = 'left';
  @Input()
  public isDisabled = Boolean(false);
  @Output()
  public _onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  public handleClick(event: any) {
    if (event && !this.isDisabled) {
      this._onClick.emit(event);
    }
  }

  public get styleClass() {
    if (this.styleClassButton.includes('p-button-')) {
      return this.styleClassButton;
    }
    return 'p-button-' + this.styleClassButton;
  }
}
