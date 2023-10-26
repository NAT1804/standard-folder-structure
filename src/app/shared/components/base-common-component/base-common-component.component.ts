import { Component } from '@angular/core';

@Component({
  selector: 'emir-base-common-component',
  templateUrl: './base-common-component.component.html',
  styleUrls: ['./base-common-component.component.scss'],
})
export class BaseCommonComponent {
  constructor() {
    console.log('constructor');
  }
}
