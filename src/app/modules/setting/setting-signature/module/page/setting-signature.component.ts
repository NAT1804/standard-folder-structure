import { Component, OnInit } from '@angular/core';
import { IImage } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { SettingSignatureModel } from '../../model/SettingSignature.model';

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
    // this.breadcrumbService.setItems([
    //   { label: 'Trang chủ', routerLink: ['/home'] },
    //   { label: 'Cài đặt chung' },
    //   { label: 'Chữ ký số' },
    // ] as MenuItem[]);
    this.headerService.setHeader('Chữ ký số');
  }

  public get image() {
    return {
      src: this.dataSource.img,
      width: 'auto',
      height: 'auto',
    } as IImage;
  }
}
