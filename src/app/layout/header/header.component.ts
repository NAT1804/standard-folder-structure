import { Component, HostListener, Input, OnInit, inject } from '@angular/core';

import { StorageService } from '@core/services/storage/storage.service';
import { AuthService } from '@core/services/auth/auth.service';
import { LoggerService } from '@core/logger.service';
import { Subscription } from 'rxjs';
import { EventBusService } from '@app/core/services/event-bus/event-bus.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  @Input() isHover = false;

  canShowSearchAsOverlay = false;

  private authService = inject(AuthService);
  private storageService = inject(StorageService);
  private loggerService = inject(LoggerService);
  private eventBusService = inject(EventBusService);

  eventBusSub?: Subscription;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkCanShowSerachAsOverlay(window.innerWidth);
  }

  ngOnInit(): void {
    this.checkCanShowSerachAsOverlay(window.innerWidth);

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
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

  checkCanShowSerachAsOverlay(innerWidth: number): void {
    if (innerWidth < 845) {
      this.canShowSearchAsOverlay = true;
    } else {
      this.canShowSearchAsOverlay = false;
    }
  }

  logout() {
    this.storageService.clean();

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
