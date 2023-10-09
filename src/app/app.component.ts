import { Component } from '@angular/core';

interface SidenavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'standard-folder-structure';

  isSidenavCollapsed = false;
  screenWidth = 0;

  onToggleSidenav(data: SidenavToggle): void {
    this.isSidenavCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }
}
