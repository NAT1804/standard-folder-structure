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
  selector: 'emir-form-multi-select',
  templateUrl: './form-multi-select.component.html',
  styleUrls: ['./form-multi-select.component.scss'],
})
export class FormMultiSelectComponent
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
  public classMultiSelect = String('');
  @Input()
  public widthMultiSelect = String('100%');
  @Input()
  public options: IDropdown[] = [];
  @Input()
  public ngModelValue: number[] | string[] | undefined = undefined;
  @Input()
  public showClear = Boolean(true);
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
  public filterField: string = LABEL;
  @Input()
  public selectionLimit: number | undefined = undefined;
  @Output()
  public _onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public ngModelValueChange: EventEmitter<number[] | string[] | undefined> =
    new EventEmitter<number[] | string[] | undefined>();

  constructor() {
    super();
    console.log('constructor');
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
    return this.filterField === LABEL
      ? this.filterField
      : `rawData.${this.filterField}`;
  }

  public onClickClear(event: any) {
    if (event) {
      this.ngModelValueChange.emit(undefined);
      this._onChange.emit(event);
    }
  }
}
