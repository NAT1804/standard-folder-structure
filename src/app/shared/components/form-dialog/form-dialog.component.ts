import { Component, Input, OnInit } from '@angular/core';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';
import { IActionButtonDialog } from '@app/data/interfaces/interface';

@Component({
  selector: 'emir-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent extends BaseCommonComponent implements OnInit {
  @Input()
  public classDialogHeader = String('');
  @Input()
  public header = String('');
  @Input()
  public classDialogContnent = String('');
  @Input()
  public classDialogFooter = String('');
  @Input()
  public listAction: IActionButtonDialog[] = [];

  constructor() {
    super();
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  public handleClick(event: any, action: IActionButtonDialog) {
    if (event && action) {
      action.callBack();
    }
  }
}
