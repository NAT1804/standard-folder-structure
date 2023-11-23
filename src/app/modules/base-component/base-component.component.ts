import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from '@app/layout/header/header.service';
import { STATUS_RESPONSE } from '@app/shared/constants/app.const';
import { DialogCommonService } from '@app/shared/dialogs/dialog-common.service';
import { ApiConstantService } from '@app/shared/services/api-constant.service';
import { RouterService } from '@app/shared/services/router.service';
import { SpinnerService } from '@app/shared/services/spinner.service';
import { ToastService } from '@app/shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'emir-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.scss'],
})
export abstract class BaseComponent {
  // protected breadcrumbService = inject(BreadcrumbService);
  protected headerService = inject(HeaderService);
  protected routerService = inject(RouterService);
  protected spinnerService = inject(SpinnerService);
  protected toastService = inject(ToastService);
  protected routeActive = inject(ActivatedRoute);
  protected dialogCommonService = inject(DialogCommonService);
  protected apiConstantService = inject(ApiConstantService);

  public isSubmit = Boolean(false);
  public subscriptions: Subscription[] = [];

  protected handleResponse(response: any, message?: string): boolean {
    if (response) {
      if (response?.status === STATUS_RESPONSE.SUCCESS) {
        if (message) this.toastService.showToastSucess(message);
        return true;
      } else {
        let message = '';
        if (response?.message) {
          message = response?.message;
        } else {
          message = 'Có lỗi xảy ra vui lòng thử lại sau!';
        }
        this.toastService.showToastError(message);
        return false;
      }
    }
    return false;
  }
}
