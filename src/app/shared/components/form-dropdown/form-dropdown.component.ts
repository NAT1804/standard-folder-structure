import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IDropdown } from '@app/data/interfaces/interface';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';

export const LABEL = 'label';

@Component({
  selector: 'emir-form-dropdown',
  templateUrl: './form-dropdown.component.html',
  styleUrls: ['./form-dropdown.component.scss'],
})
export class FormDropdownComponent
  extends BaseCommonComponent
  implements OnInit
{
  @Input()
  public floatLabel = Boolean(false);
  @Input()
  public classContainer = String('');
  @Input()
  public classLabel = String('');
  @Input()
  public classDropdown = String('');
  @Input()
  public widthDropdown = String('100%');
  @Input()
  public options: IDropdown[] = [];
  @Input()
  public ngModelValue: number | undefined = undefined;
  @Input()
  public showClear = Boolean(false);
  @Input()
  public showClearFloatLabel = Boolean(true);
  @Input()
  public showLabel = Boolean(true);
  @Input()
  public label = String('');
  @Input()
  public placeholder = String('');
  @Input()
  public isRequired = Boolean(false);
  @Input()
  public autoDisplayFirst = Boolean(false);
  @Input()
  public isDisabled = Boolean(false);
  @Input()
  public isFilter = Boolean(false);
  @Input()
  public filterField: string = LABEL;
  @Output()
  public _onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public ngModelValueChange: EventEmitter<number | undefined> =
    new EventEmitter<number | undefined>();

  constructor() {
    super();
  }

  ngOnInit() {
    console.log('ngOnInit');
  }
  ngOnChanges(changes: SimpleChanges) {
    this.placeholder = this.floatLabel
      ? this.placeholder || 'Tất cả'
      : this.placeholder;
  }

  public onChange(event: any) {
    if (event) {
      this.ngModelValueChange.emit(event.value);
      this._onChange.emit(event);
    }
  }

  public get filterBy() {
    return this.isFilter
      ? this.filterField === LABEL
        ? this.filterField
        : `rawData.${this.filterField}`
      : undefined;
  }

  public onClear(event: any) {
    if (event) {
      this.ngModelValueChange.emit(undefined);
    }
  }
}
