import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private confirmationService: ConfirmationService) {}

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
