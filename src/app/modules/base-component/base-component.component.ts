import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '@app/layout/breadcrumb/breadcrumb.service';
import { DialogCommonService } from '@app/shared/dialogs/dialog-common.service';
import { ApiConstantService } from '@app/shared/services/api-constant.service';
import { RouterService } from '@app/shared/services/router.service';
import { SpinnerService } from '@app/shared/services/spinner.service';
import { ToastService } from '@app/shared/services/toast.service';

@Component({
  selector: 'emir-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.scss'],
})
export abstract class BaseComponent {
  protected breadcrumbService = inject(BreadcrumbService);
  protected routerService = inject(RouterService);
  protected spinnerService = inject(SpinnerService);
  protected toastService = inject(ToastService);
  protected routeActive = inject(ActivatedRoute);
  protected dialogCommonService = inject(DialogCommonService);
  protected apiConstantService = inject(ApiConstantService);

  public isSubmit = Boolean(false);
}
