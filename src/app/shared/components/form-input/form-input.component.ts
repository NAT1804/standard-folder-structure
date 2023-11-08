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
import { TYPE_INPUT } from '@app/shared/constants/app.const';

@Component({
  selector: 'emir-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent
  extends BaseCommonComponent
  implements OnInit, AfterViewInit
{
  @Input()
  public floatLabel = Boolean(false);
  @Input()
  public classContainer = String('');
  @Input()
  public showIconSearch = Boolean(true);
  @Input()
  public type = String(TYPE_INPUT.TEXT);
  @Input()
  public placeholder = String('');
  @Input()
  public widthInput = String('100%');
  @Input()
  public ngModelValue = String('');
  @Input()
  public showLabel = Boolean(true);
  @Input()
  public classLabel = String('');
  @Input()
  public isDisabled = Boolean(false);
  @Input()
  public isRequired = Boolean(false);
  @Input()
  public label = String('Tìm kiếm');
  @Input()
  public classInput = String('');
  @Input()
  public min: number;
  @Input()
  public max: number;
  @Input()
  public isHideArrows = Boolean(false);
  private subjectChangeInput: Subject<any> = new Subject();
  @Output()
  public _onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public ngModelValueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    super();
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  ngAfterViewInit() {
    this.subjectChangeInput.pipe(debounceTime(1000)).subscribe((res) => {
      if (res) {
        this._onChange.emit(res);
      }
    });
  }

  public handleInput(event: any) {
    if (event) {
      this.ngModelValueChange.emit(event.target.value);
      this.subjectChangeInput.next(event);
    }
  }
}
