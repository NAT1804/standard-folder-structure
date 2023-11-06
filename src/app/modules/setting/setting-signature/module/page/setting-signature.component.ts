import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { MenuItem } from 'primeng/api';
import { SettingSignatureModel } from '../../model/SettingSignature.model';
import { IImage } from '@app/data/interfaces/interface';

@Component({
  selector: 'emir-setting-signature',
  templateUrl: './setting-signature.component.html',
  styleUrls: ['./setting-signature.component.scss'],
})
export class SettingSignatureComponent extends BaseComponent implements OnInit {
  public dataSource: SettingSignatureModel = new SettingSignatureModel();

  constructor() {
    super();
  }

  ngOnInit() {
    this.breadcrumbService.setItems([
      { label: 'Trang chủ', routerLink: ['/home'] },
      { label: 'Cài đặt chung' },
      { label: 'Chữ ký số' },
    ] as MenuItem[]);
  }

  public get image() {
    return {
      src: this.dataSource.img,
      width: 'auto',
      height: 'auto',
    } as IImage;
  }
}
