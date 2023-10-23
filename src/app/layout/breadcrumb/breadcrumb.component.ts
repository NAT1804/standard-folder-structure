import { Component, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnDestroy {
  subscription: Subscription;
  items: MenuItem[] = [];

  constructor(public breadcrumbService: BreadcrumbService) {
    this.subscription = breadcrumbService._itemsSource$.subscribe((res) => {
      this.items = res || [];
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
