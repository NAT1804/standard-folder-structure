import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root',
})
export class DialogCommonService {
  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {}

  public createDialog(
    component: any,
    width: string,
    height = String('auto'),
    isResize = Boolean(true)
  ) {
    const modalRef = this.dialogService.open(component, {
      showHeader: false,
      width: width,
      height: height,
      style: {
        'max-height': '95%',
      },
      contentStyle: {
        padding: '0',
        'border-top-left-radius': '0.25rem',
        'border-top-right-radius': '0.25rem',
      },
      resizable: isResize,
    });
    return modalRef;
  }

  public createConfirmDialog(
    header: string,
    message: string,
    funcAccept: () => void,
    funcReject: () => void
  ) {
    const modalRef = this.confirmationService.confirm({
      header: header,
      message: message,
      accept: () => funcAccept(),
      reject: () => funcReject(),
      closeOnEscape: false,
    });
    return modalRef;
  }
}
