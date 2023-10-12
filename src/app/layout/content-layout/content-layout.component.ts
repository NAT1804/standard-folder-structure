import { Component, OnInit } from '@angular/core';

import { SideNavToggle } from '@app/data/interfaces/nav-data.interface';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent implements OnInit {
  public isSidenavCollapsed = true;
  public screenWidth = window.innerWidth;
  public classStyling = '';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ngOnInit(): void {
    this.classStyling = this.getClass();
  }

  onToggleSidenav(data: SideNavToggle): void {
    this.isSidenavCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
    this.classStyling = this.getClass();
  }

  getClass(): string {
    let styleClass = '';
    if (this.isSidenavCollapsed && this.screenWidth > 768) {
      styleClass = 'container-trimmed';
    } else if (
      this.isSidenavCollapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'container-md-screen';
    }
    return styleClass;
  }
}
