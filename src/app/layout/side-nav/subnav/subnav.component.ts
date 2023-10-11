import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

import { INavData } from '@app/data/interfaces/nav-data.interface';

@Component({
  selector: 'app-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.scss'],
  animations: [
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
      transition('visible <=> visible', [
        style({ overflow: 'hidden' }),
        animate('{{transitionParam}}'),
      ]),
      transition('void => *', animate(0)),
    ]),
  ],
})
export class SubnavComponent implements OnInit {
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

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

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
}
