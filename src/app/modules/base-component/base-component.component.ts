import { Component, inject } from '@angular/core';
import { BreadcrumbService } from '@app/layout/breadcrumb/breadcrumb.service';
import { RouterService } from '@app/shared/services/router.service';
import { SpinnerService } from '@app/shared/services/spinner.service';

@Component({
  selector: 'emir-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.scss'],
})
export abstract class BaseComponent {
  protected breadcrumbService = inject(BreadcrumbService);
  protected routerService = inject(RouterService);
  protected spinnerService = inject(SpinnerService);

  public isSubmit = Boolean(false);
  constructor() {
    console.log('constructor');
  }
}
