import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Injectable()
export class BreadcrumbService {
  private _itemsSource: BehaviorSubject<MenuItem[] | undefined>;
  _itemsSource$: Observable<MenuItem[] | undefined>;

  constructor() {
    this._itemsSource = new BehaviorSubject<MenuItem[] | undefined>(undefined);
    this._itemsSource$ = this._itemsSource.asObservable();
  }
  setItems(items: MenuItem[]) {
    this._itemsSource.next(items);
  }
}
