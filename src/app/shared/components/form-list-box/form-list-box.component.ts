import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListBox } from '@app/data/interfaces/interface';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';

@Component({
  selector: 'emir-form-list-box',
  templateUrl: './form-list-box.component.html',
  styleUrls: ['./form-list-box.component.scss'],
})
export class FormListBoxComponent extends BaseCommonComponent {
  @Input()
  public classContainer = String('');
  @Input()
  public classListBox = String('');
  @Input()
  public options: IListBox[] = [];
  @Input()
  public ngModelValue: any = undefined;
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
