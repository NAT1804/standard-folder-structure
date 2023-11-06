import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';
import {
  COMPARE_TYPE,
  ESelectionModeCalendar,
} from '@app/shared/constants/app.const';
import moment from 'moment';
import { compareDate } from '@app/shared/function-common';

@Component({
  selector: 'emir-form-input-calendar',
  templateUrl: './form-input-calendar.component.html',
  styleUrls: ['./form-input-calendar.component.scss'],
})
export class FormInputCalendarComponent
  extends BaseCommonComponent
  implements OnInit, AfterViewInit
{
  @Input()
  public floatLabel = Boolean(false);
  @Input()
  public classContainer = String('');
  @Input()
  public showIcon = Boolean(true);
  @Input()
  public showTime = Boolean(false);
  @Input()
  public placeholder = String('');
  @Input()
  public ngModelValue: any = '';
  @Input()
  public showLabel = Boolean(true);
  @Input()
  public isDisabled = Boolean(false);
  @Input()
  public isRequired = Boolean(false);
  @Input()
  public widthInput = String('100%');
  @Input()
  public readonlyInput = Boolean(false);
  @Input()
  public showButtonBar = Boolean(false);
  @Input()
  public timeOnly = Boolean(false);
  @Input()
  public minDate: Date | undefined | any = undefined;
  @Input()
  public maxDate: Date | undefined | any = undefined;
  @Input()
  public label = String('');
  @Input()
  public classLabel = String('');
  @Input()
  public selectionMode = ESelectionModeCalendar.SINGLE;
  private subjectChangeInput: Subject<any> = new Subject();
  @Output()
  public _onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public ngModelValueChange: EventEmitter<any> = new EventEmitter<any>();

  public oldValue: Date | undefined = undefined;
  public isValid = Boolean(true);

  constructor() {
    super();
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  ngAfterViewInit() {
    this.ngModelValue && (this.oldValue = new Date(this.ngModelValue));

    this.subjectChangeInput
      .pipe(debounceTime(200))
      .subscribe((responseDate) => {
        if (responseDate) {
          const formatDate = this.validFormatDate(responseDate);
          this.isValid = !!formatDate;
          if (formatDate) {
            this.ngModelValueChange.emit(this.ngModelValue);
            this._onChange.emit(this.ngModelValue);
          }
        }
      });
  }

  public handleInput(event: any) {
    if (event) {
      if (event.target.value.length) {
        this.subjectChangeInput.next(event.target.value);
      } else {
        this.emitUndefinedData();
      }
    }
  }

  public handleSelect(event: any) {
    if (event) {
      this.isValid = true;
      if (this.checkCompareData()) {
        this.oldValue = new Date(this.ngModelValue);
        this.ngModelValueChange.emit(new Date(this.ngModelValue));
        this._onChange.emit(new Date(this.ngModelValue));
      }
    }
  }

  public handleClearClick(event: any) {
    if (event) {
      this.isValid = true;
      this.emitUndefinedData();
    }
  }

  public handleClose(event: any) {
    if (event) {
      if (!this.isValid) {
        this.emitUndefinedData();
      }
    }
  }

  private validFormatDate(value: string): string {
    const listFormat = [
      'DD/MM/YYYY',
      'DD/MM/YYYY HH:mm',
      'DD/MM/YYYY HH:mm:ss',
    ];
    for (const format of listFormat) {
      if (moment(value, format, true).isValid()) {
        return format;
      }
    }
    return '';
  }

  private emitUndefinedData() {
    if (this.checkCompareData()) {
      this.oldValue = undefined;

      this.ngModelValueChange.emit(undefined);
      this._onChange.emit(undefined);
    }
  }

  private checkCompareData() {
    let result = Boolean(true);
    if (!this.oldValue && !this.ngModelValue) {
      result = false;
    } else if (this.oldValue && this.ngModelValue) {
      result = !compareDate(
        this.oldValue,
        this.ngModelValue,
        COMPARE_TYPE.EQUAL
      );
    }
    return result;
  }
}
