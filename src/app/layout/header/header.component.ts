import { Component, Input, OnInit, inject } from '@angular/core';

import { EventBusService } from '@app/core/services/event-bus/event-bus.service';
import { LoggerService } from '@core/logger.service';
import { AuthService } from '@core/services/auth/auth.service';
import { StorageService } from '@core/services/storage/storage.service';
import { Subscription } from 'rxjs';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  @Input() isHover = false;

  private authService = inject(AuthService);
  private storageService = inject(StorageService);
  private loggerService = inject(LoggerService);
  private eventBusService = inject(EventBusService);
  private headerService = inject(HeaderService);
  subscription: Subscription;
  headerTitle = String('');

  eventBusSub?: Subscription;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ngOnInit(): void {
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
    this.subscription = this.headerService._header$.subscribe((res) => {
      this.headerTitle = res || '';
    });
  }

  getHeadClass(): string {
    let classStyle = '';
    if (this.isHover) {
      classStyle = 'layout-topbar-collapsed';
      return classStyle;
    }
    if (this.collapsed || this.screenWidth <= 768) {
      classStyle = 'layout-topbar-collapsed';
    }
    return classStyle;
  }

  logout() {
    this.storageService.clean();
    window.location.reload();

    // this.authService.logout().subscribe({
    //   next: (_) => {
    //     this.storageService.clean();
    //   },
    //   error: (err) => {
    //     this.loggerService.error(err);
    //   },
    // });
  }
}
