import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITabView } from '@app/data/interfaces/interface';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';

@Component({
  selector: 'emir-form-tab-view',
  templateUrl: './form-tab-view.component.html',
  styleUrls: ['./form-tab-view.component.scss'],
})
export class FormTabViewComponent
  extends BaseCommonComponent
  implements OnInit
{
  @Input()
  public activeIndex = Number(0);
  @Input()
  public listTabPanel: ITabView[] = [];
  @Output()
  public activeIndexChange: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public _onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  public handleChangeTab(event: any) {
    if (event) {
      this.activeIndexChange.emit(event.index);
      this._onChange.emit(event);
    }
  }
}
