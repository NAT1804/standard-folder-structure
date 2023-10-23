import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getFooterClass(): string {
    let classStyle = '';
    if (this.collapsed || this.screenWidth <= 768) {
      classStyle = 'layout-footer-collapsed';
    }
    return classStyle;
  }
}
