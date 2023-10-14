import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  canShowSearchAsOverlay = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkCanShowSerachAsOverlay(window.innerWidth);
  }

  ngOnInit(): void {
    this.checkCanShowSerachAsOverlay(window.innerWidth);
  }

  getHeadClass(): string {
    let classStyle = '';
    if (this.collapsed && this.screenWidth > 768) {
      classStyle = 'head-trimmed';
    } else {
      classStyle = 'head-md-screen';
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
}
