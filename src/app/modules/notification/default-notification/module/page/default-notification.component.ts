import { Component } from '@angular/core';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { MARKDOWN_OPTIONS } from '@app/shared/constants/app.const';

@Component({
  selector: 'ecore-default-notification',
  templateUrl: './default-notification.component.html',
  styleUrls: ['./default-notification.component.scss'],
})
export class DefaultNotificationComponent extends BaseComponent {
  constructor() {
    super();
  }

  public contentType = MARKDOWN_OPTIONS.MARKDOWN;
  public content = '';
  public test = '';
  public options = [];

  public onClickSave(event: any) {
    if (event) {
      console.log('onClickSave');
    }
  }
}
