import { Component, Input } from '@angular/core';
import { IActionTable } from '@app/data/interfaces/interface';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';

@Component({
  selector: 'emir-form-menu',
  templateUrl: './form-menu.component.html',
  styleUrls: ['./form-menu.component.scss'],
})
export class FormMenuComponent extends BaseCommonComponent {
  @Input()
  public classContainer = String('');
  @Input()
  public icon = String('pi pi-ellipsis-h');
  @Input()
  public classMenu = String('');
  @Input()
  public actions: IActionTable[] = [];
  @Input()
  public inlineStyle: any;

  constructor() {
    super();
  }
}
