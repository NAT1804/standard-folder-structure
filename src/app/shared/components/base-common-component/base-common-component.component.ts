import { Component, Input } from '@angular/core';

@Component({
  selector: 'emir-base-common-component',
  templateUrl: './base-common-component.component.html',
  styleUrls: ['./base-common-component.component.scss'],
})
export class BaseCommonComponent {
  @Input()
  public isValidData = Boolean(false);
  @Input()
  public isSubmit = Boolean(false);
  @Input()
  public messageError = String('');

  constructor() {
    console.log('constructor');
  }
}
