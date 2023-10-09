import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { navData } from './nav-data';

interface SidenavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Output() toggleSidenav: EventEmitter<SidenavToggle> = new EventEmitter();
  screenWidth = 0;
  collapsed = false;
  navData = navData;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log(event);
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.toggleSidenav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
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
}
