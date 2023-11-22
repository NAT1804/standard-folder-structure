import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class HeaderService {
  private _header: BehaviorSubject<string | undefined>;
  _header$: Observable<string | undefined>;

  constructor() {
    this._header = new BehaviorSubject<string | undefined>(undefined);
    this._header$ = this._header.asObservable();
  }
  setHeader(item: string | undefined) {
    this._header.next(item);
  }
}
