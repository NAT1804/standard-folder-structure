import { Component, Input } from '@angular/core';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';

@Component({
  selector: 'emir-form-markdown',
  templateUrl: './form-markdown.component.html',
  styleUrls: ['./form-markdown.component.scss'],
})
export class FormMarkdownComponent extends BaseCommonComponent {
  @Input()
  public classContainer = String('');
  @Input()
  public classLabel = String('');
  @Input()
  public showLabel = Boolean(true);
  @Input()
  public label = String('');
  @Input()
  public isRequired = Boolean(false);
  @Input()
  public classMarkdown = String('');
  @Input()
  public data = String('');
  constructor() {
    super();
  }
}
