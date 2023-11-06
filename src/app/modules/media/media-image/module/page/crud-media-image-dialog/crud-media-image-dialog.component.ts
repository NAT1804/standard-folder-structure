import { Component, OnInit } from '@angular/core';
import { IActionButtonDialog } from '@app/data/interfaces/interface';
import { BaseDialogComponent } from '@app/shared/dialogs/base-dialog.component';

@Component({
  selector: 'emir-crud-media-image-dialog',
  templateUrl: './crud-media-image-dialog.component.html',
  styleUrls: ['./crud-media-image-dialog.component.scss'],
})
export class CrudMediaImageDialogComponent
  extends BaseDialogComponent
  implements OnInit
{
  public listAction: IActionButtonDialog[] = [];

  constructor() {
    super();
  }

  ngOnInit() {
    console.log('ngOnInit');
  }
}
