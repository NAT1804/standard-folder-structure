import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';

import {
  INavData,
  SideNavToggle,
} from '@app/data/interfaces/nav-data.interface';
import { RouterService } from '@app/shared/services/router.service';
import { fadeInOut } from '@shared/constants/nav/nav-animation';
import { navData } from '@shared/constants/nav/nav-data';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(1turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SideNavComponent implements OnInit, AfterViewInit {
  @Output() toggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter();
  public _onResize: BehaviorSubject<number | undefined>;
  public _onResize$: Observable<number | undefined> = new Observable<
    number | undefined
  >(undefined);
  public screenWidth = 0;
  public collapsed = false;
  public navData = navData;
  public multiple = false;
  public hoverOnsideNav = false;

  constructor(private routerService: RouterService) {
    this._onResize = new BehaviorSubject<number | undefined>(undefined);
    this._onResize$ = this._onResize.asObservable();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (event) {
      this.emitOnResize();
    }
  }

  ngOnInit(): void {
    this.emitOnResize();
    this.getAtiveMenu();
  }

  ngAfterViewInit(): void {
    this._onResize$.pipe(distinctUntilChanged()).subscribe((res) => {
      if (res && res < 0) {
        this.collapsed = true;
        this.toggleSidenav.emit({
          collapsed: this.collapsed,
          screenWidth: this.screenWidth,
        });
      }
    });
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.toggleSidenav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  clickOpenSideNav() {
    this.collapsed = false;
    this.hoverOnsideNav = false;
    this.toggleSidenav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav() {
    this.collapsed = true;
    this.toggleSidenav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  private emitOnResize() {
    this.screenWidth = window.innerWidth;
    this._onResize.next(this.screenWidth - 768 <= 0 ? -1 : 1);
  }

  handleClick(event: Event, selectedItem: INavData): void {
    event.preventDefault();
    if (!this.multiple) {
      for (const item of this.navData) {
        if (selectedItem !== item && item.expanded) {
          item.expanded = false;
        }
      }
    }
    selectedItem.expanded = !selectedItem.expanded;
  }

  getActiveClass(data: INavData): string {
    return this.routerService.getRouterInclude('/' + data.routerLink)
      ? 'active'
      : '';
  }

  onMouseOverSidenav(data: Event) {
    if (data && this.collapsed) {
      this.hoverOnsideNav = true;
      this.collapsed = false;
      this.toggleSidenav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
        isHover: true,
      });
    }
  }

  onMouseOutSidenav(data: Event) {
    if (data && this.hoverOnsideNav) {
      this.collapsed = true;
    }
  }

  public onClickBtnCollapsed(event: any) {
    if (event) {
      if (!this.clickedSideNav) {
        this.closeSidenav();
      } else {
        this.clickOpenSideNav();
      }
    }
  }

  private getAtiveMenu() {
    this.navData.forEach((navItem: INavData) => {
      if (this.routerService.getRouterInclude('/' + navItem.routerLink)) {
        navItem.expanded = true;
      }
    });
  }

  public get clickedSideNav() {
    if (this.hoverOnsideNav) {
      return true;
    }
    return this.collapsed;
  }
}
