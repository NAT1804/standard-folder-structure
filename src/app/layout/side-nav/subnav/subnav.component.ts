import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { fadeInOut } from '@shared/constants/nav/nav-animation';
import { INavData } from '@app/data/interfaces/nav-data.interface';

@Component({
  selector: 'app-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['../side-nav.component.scss', './subnav.component.scss'],
  animations: [
    fadeInOut,
    trigger('submenu', [
      state(
        'hidden',
        style({
          height: '0',
          overflow: 'hidden',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
        })
      ),
      transition('visible <=> hidden', [
        style({ overflow: 'hidden' }),
        animate('{{transitionParams}}'),
      ]),
      transition('void => *', animate(0)),
    ]),
  ],
})
export class SubnavComponent {
  @Input() data: INavData = {
    routerLink: '',
    icon: '',
    label: '',
    expanded: false,
    children: [],
  };
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple = false;

  constructor(public router: Router) {}

  handleClick(event: Event, selectedItem: INavData): void {
    event.preventDefault();
    if (!this.multiple) {
      if (this.data.children && this.data.children.length > 0) {
        for (const item of this.data.children) {
          if (selectedItem !== item && item.expanded) {
            item.expanded = true;
          }
        }
      }
    }
    selectedItem.expanded = !selectedItem.expanded;
  }

  getActiveClass(data: INavData): string {
    return this.router.url.includes(data.routerLink) ? 'active-sublevel' : '';
  }
}
