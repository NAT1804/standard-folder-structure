import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SEVERITY } from '../constants/app.const';

@Injectable()
export class ToastService {
  constructor(private messageService: MessageService) {}

  public showToastSucess(message: string) {
    this.messageService.add({
      key: 'tst',
      severity: SEVERITY.SUCCESS,
      summary: message,
    });
  }

  public showToastError(message: string) {
    this.messageService.add({
      key: 'tst',
      severity: SEVERITY.ERROR,
      summary: message,
    });
  }
}
