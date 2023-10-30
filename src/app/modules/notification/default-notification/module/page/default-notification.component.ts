import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/modules/base-component/base-component.component';

@Component({
  selector: 'ecore-default-notification',
  templateUrl: './default-notification.component.html',
  styleUrls: ['./default-notification.component.scss'],
})
export class DefaultNotificationComponent
  extends BaseComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit() {
    console.log('ngOnInit');
  }
}
