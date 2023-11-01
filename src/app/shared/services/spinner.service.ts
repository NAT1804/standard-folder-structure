import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  showSpinner() {
    this._loading.next(true);
  }

  removeSpinner() {
    this._loading.next(false);
  }
}
