import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { navData } from './nav-data';
import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';

interface SidenavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, AfterViewInit {
  @Output() toggleSidenav: EventEmitter<SidenavToggle> = new EventEmitter();
  public _onResize: BehaviorSubject<number | undefined>;
  public _onResize$: Observable<number | undefined> = new Observable<
    number | undefined
  >(undefined);

  constructor() {
    this._onResize = new BehaviorSubject<number | undefined>(undefined);
    this._onResize$ = this._onResize.asObservable();
  }

  screenWidth = 0;
  collapsed = true;
  navData = navData;

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
}
