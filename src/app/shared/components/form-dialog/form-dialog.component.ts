import { Component, Input } from '@angular/core';
import { IActionButtonDialog } from '@app/data/interfaces/interface';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';

@Component({
  selector: 'emir-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent extends BaseCommonComponent {
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

  constructor(private dynamicDialogRef: DynamicDialogRef) {
    super();
  }

  public handleClick(event: any, action: IActionButtonDialog) {
    if (event && action) {
      action.callBack();
    }
  }

  public onClickCloseModal(event: any) {
    if (event) {
      this.dynamicDialogRef.close();
    }
  }
}
