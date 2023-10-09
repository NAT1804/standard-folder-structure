import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-layout',
  templateUrl: './custom-layout.component.html',
  styleUrls: ['./custom-layout.component.scss'],
})
export class CustomLayoutComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (
      this.collapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
