import { Component, OnInit } from '@angular/core';
import {
  IActionButtonDialog,
  ICloseDialog,
} from '@app/data/interfaces/interface';
import { SEVERITY } from '@app/shared/constants/app.const';
import { BaseDialogComponent } from '../base-dialog.component';

@Component({
  selector: 'emir-confirm-note-dialog',
  templateUrl: './confirm-note-dialog.component.html',
  styleUrls: ['./confirm-note-dialog.component.scss'],
})
export class ConfirmNoteDialogComponent
  extends BaseDialogComponent
  implements OnInit
{
  public listAction: IActionButtonDialog[] = [];
  public note = String('');

  constructor() {
    super();
  }

  ngOnInit() {
    this.listAction = [
      {
        label:
          this.labelAction && this.labelAction.length
            ? this.labelAction[0]
            : 'Đóng',
        icon: 'pi pi-times',
        typeClassButton: SEVERITY.DANGER,
        callBack: this.onClickCloseDialog,
      },
      {
        label:
          this.labelAction && this.labelAction.length
            ? this.labelAction[1]
            : 'Lưu',
        icon: 'pi pi-save',
        callBack: this.onClickSaveDialog,
      },
    ];
  }

  public onClickCloseDialog = () => {
    if (this.dynamicDialogConfig.data.apiClickCloseDialog) {
      this.dynamicDialogConfig.data.apiClickCloseDialog(this.note, () => {
        this.closeDialog();
      });
    } else {
      this.closeDialog();
    }
  };

  public onClickSaveDialog = () => {
    if (this.dynamicDialogConfig.data.apiClickSaveDialog) {
      this.dynamicDialogConfig.data.apiClickSaveDialog(this.note, () => {
        this.closeDialog();
      });
    } else {
      this.closeDialog();
    }
  };

  public get header() {
    return this.dynamicDialogConfig.data.header || '';
  }

  public get content() {
    return this.dynamicDialogConfig.data.content || '';
  }

  private get labelAction() {
    return this.dynamicDialogConfig.data.labelAction || undefined;
  }

  private closeDialog() {
    this.dynamicDialogRef.close({
      status: true,
    } as ICloseDialog);
  }
}
