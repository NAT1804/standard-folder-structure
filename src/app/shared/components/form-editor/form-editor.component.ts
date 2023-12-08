import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';

@Component({
  selector: 'emir-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss'],
})
export class FormEditorComponent extends BaseCommonComponent {
  @Input()
  public classContainer = String('');
  @Input()
  public ngModelValue: string | undefined = undefined;
  @Input()
  public classEditor = String('');
  @Input()
  public placeholder = String('');
  @Input()
  public isDisabled = Boolean(false);
  @Input()
  public isRequired = Boolean(false);
  @Input()
  public classLabel = String('');
  @Input()
  public showLabel = Boolean(true);
  @Input()
  public label = String('');
  @Input()
  public height = String('15rem');
  public config: any = {};
  @Output()
  public _onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public ngModelValueChange: EventEmitter<string | undefined> =
    new EventEmitter<string | undefined>();

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.height) {
      this.config = { height: this.height, sanitize: false, editable: true };
    }
  }

  handleChange(event: any) {
    if (event) {
      this.ngModelValueChange.emit(event);
      this._onChange.emit(event);
    }
  }
}
