import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'emir-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss'],
})
export class FormButtonComponent implements OnInit {
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
  @Input()
  public isTypeRipple = Boolean(false);
  @Output()
  public _onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
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
}
