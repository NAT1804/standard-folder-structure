import { Component, Input, OnInit } from '@angular/core';
import { IActionTable } from '@app/data/interfaces/interface';

@Component({
  selector: 'emir-form-menu',
  templateUrl: './form-menu.component.html',
  styleUrls: ['./form-menu.component.scss'],
})
export class FormMenuComponent implements OnInit {
  @Input()
  public classContainer = String('');
  @Input()
  public icon = String('pi pi-ellipsis-h');
  @Input()
  public classMenu = String('');
  @Input()
  public actions: IActionTable[] = [];

  constructor() {
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');
  }
}
