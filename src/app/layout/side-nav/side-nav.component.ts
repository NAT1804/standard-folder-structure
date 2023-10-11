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
  style,
  transition,
  trigger,
  animate,
  keyframes,
} from '@angular/animations';

import { navData } from '@core/constants/nav-data';
import { INavData } from '@app/data/interfaces/nav-data.interface';

interface SidenavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('150ms', style({ opacity: 0 })),
      ]),
    ]),
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
  @Output() toggleSidenav: EventEmitter<SidenavToggle> = new EventEmitter();
  public _onResize: BehaviorSubject<number | undefined>;
  public _onResize$: Observable<number | undefined> = new Observable<
    number | undefined
  >(undefined);
  public screenWidth = 0;
  public collapsed = true;
  public navData = navData;
  public multiple = false;

  constructor() {
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
  }

  ngAfterViewInit(): void {
    this._onResize$.pipe(distinctUntilChanged()).subscribe((res) => {
      if (res && res < 0) {
        this.collapsed = false;
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

  closeSidenav() {
    this.collapsed = false;
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
          item.expanded = true;
        }
      }
    }
    selectedItem.expanded = !selectedItem.expanded;
  }
}
