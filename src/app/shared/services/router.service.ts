import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class RouterService {
  private _previousUrl = String('/home');
  private currentUrl = String('/home');

  public _routerChange: BehaviorSubject<boolean | undefined>;
  public _routerChange$: Observable<boolean | undefined>;

  constructor(
    public router: Router,
    public routeActive: ActivatedRoute
  ) {
    this._routerChange = new BehaviorSubject<boolean | undefined>(undefined);
    this._routerChange$ = this._routerChange.asObservable();

    this.init();
  }

  private init() {
    // get previos router
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this._previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      });

    // detect router change
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && !!val) {
        this._routerChange.next(true);
      }
    });
  }

  public get previousUrl() {
    return this._previousUrl;
  }

  public get url() {
    return this.router.url;
  }

  public getRouterInclude(key: string): boolean {
    return this.router.url.includes(key);
  }

  public routerNavigate(urls: any[]) {
    this.router.navigate(urls);
  }
}
