import { Component } from '@angular/core';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { SettingSendNotiModel } from '../../model/SettingSendNoti.model';

@Component({
  selector: 'emir-setting-send-noti',
  templateUrl: './setting-send-noti.component.html',
  styleUrls: ['./setting-send-noti.component.scss'],
})
export class SettingSendNotiComponent extends BaseComponent {
  public dataSource: SettingSendNotiModel = new SettingSendNotiModel();

  constructor() {
    super();
  }

  public isValidData(key: string) {
    return this.dataSource.showValidateData(key);
  }
}
