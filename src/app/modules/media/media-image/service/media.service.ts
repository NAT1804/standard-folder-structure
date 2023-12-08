import { Injectable } from '@angular/core';
import { IDropdown, ISortTable } from '@app/data/interfaces/interface';
import { Page } from '@app/data/model/page';
import { STATUS_RESPONSE } from '@app/shared/constants/app.const';
import { mapDropdownDTOToIDropdown } from '@app/shared/function-common';
import { BaseService } from '@app/shared/services/base.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaImageService extends BaseService {
  private readonly baseAPI = '/api/v1/media';
  public _listPageMediaImage$: Observable<IDropdown[] | undefined>;
  public _listPageMediaImage: BehaviorSubject<IDropdown[] | undefined>;
  public _listPositionMediaImage$: Observable<IDropdown[] | undefined>;
  public _listPositionMediaImage: BehaviorSubject<IDropdown[] | undefined>;
  public _listStatusMediaImage$: Observable<IDropdown[] | undefined>;
  public _listStatusMediaImage: BehaviorSubject<IDropdown[] | undefined>;
  public _listOutstandingMediaImage$: Observable<IDropdown[] | undefined>;
  public _listOutstandingMediaImage: BehaviorSubject<IDropdown[] | undefined>;
  public _listRedirectType$: Observable<IDropdown[] | undefined>;
  public _listRedirectType: BehaviorSubject<IDropdown[] | undefined>;
  public _listRedirectLevel1$: Observable<IDropdown[] | undefined>;
  public _listRedirectLevel1: BehaviorSubject<IDropdown[] | undefined>;
  public _listRedirectLevel2$: Observable<IDropdown[] | undefined>;
  public _listRedirectLevel2: BehaviorSubject<IDropdown[] | undefined>;

  constructor() {
    super();

    this._listPageMediaImage = new BehaviorSubject<IDropdown[] | undefined>(
      undefined
    );
    this._listPageMediaImage$ = this._listPageMediaImage.asObservable();
    this._listPositionMediaImage = new BehaviorSubject<IDropdown[] | undefined>(
      undefined
    );
    this._listPositionMediaImage$ = this._listPositionMediaImage.asObservable();
    this._listStatusMediaImage = new BehaviorSubject<IDropdown[] | undefined>(
      undefined
    );
    this._listStatusMediaImage$ = this._listStatusMediaImage.asObservable();
    this._listOutstandingMediaImage = new BehaviorSubject<
      IDropdown[] | undefined
    >(undefined);
    this._listOutstandingMediaImage$ =
      this._listOutstandingMediaImage.asObservable();
    this._listRedirectType = new BehaviorSubject<IDropdown[] | undefined>(
      undefined
    );
    this._listRedirectType$ = this._listRedirectType.asObservable();
    this._listRedirectLevel1 = new BehaviorSubject<IDropdown[] | undefined>(
      undefined
    );
    this._listRedirectLevel1$ = this._listRedirectLevel1.asObservable();
    this._listRedirectLevel2 = new BehaviorSubject<IDropdown[] | undefined>(
      undefined
    );
    this._listRedirectLevel2$ = this._listRedirectLevel2.asObservable();
  }

  public getListPageMediaImage() {
    this.requestGet(String(this.baseAPI + '/GetMediaAppPage')).subscribe(
      (res: any) => {
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          this._listPageMediaImage.next(
            mapDropdownDTOToIDropdown(res.data, true)
          );
        }
      }
    );
  }

  public getListPositionMediaImage(pageId: string) {
    this.requestGet(
      String(this.baseAPI + '/GetMediaAppPage?page_id=' + pageId)
    ).subscribe((res: any) => {
      if (res.status === STATUS_RESPONSE.SUCCESS) {
        this._listPositionMediaImage.next(
          mapDropdownDTOToIDropdown(res.data, true)
        );
      }
    });
  }

  public getListStatusMediaImage() {
    this.requestGet(String(this.baseAPI + '/GetMediaSt')).subscribe(
      (res: any) => {
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          this._listStatusMediaImage.next(mapDropdownDTOToIDropdown(res.data));
        }
      }
    );
  }

  public getListOutstandingMediaImage() {
    this.requestGet(String(this.baseAPI + '/GetPrioOutstanding')).subscribe(
      (res: any) => {
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          this._listOutstandingMediaImage.next(
            mapDropdownDTOToIDropdown(res.data, true)
          );
        }
      }
    );
  }

  public getListRedirectType() {
    this.requestGet(String(this.baseAPI + '/GetDirectType')).subscribe(
      (res: any) => {
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          this._listRedirectType.next(mapDropdownDTOToIDropdown(res.data));
        }
      }
    );
  }

  public getListRedirectLevel1() {
    this.requestGet(String(this.baseAPI + '/GetLevel1')).subscribe(
      (res: any) => {
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          this._listRedirectLevel1.next(
            mapDropdownDTOToIDropdown(res.data, true)
          );
        }
      }
    );
  }

  public getListRedirectLevel2(redirectLevel2: string) {
    this.requestGet(
      String(this.baseAPI + '/GetLevel2?level1_id=' + redirectLevel2)
    ).subscribe((res: any) => {
      if (res.status === STATUS_RESPONSE.SUCCESS) {
        this._listRedirectLevel2.next(
          mapDropdownDTOToIDropdown(res.data, true)
        );
      }
    });
  }

  public getListMediaImage(page: Page, filter: any, sort?: ISortTable) {
    let url = String(this.baseAPI + '/GetMediaPage?');
    url += this.convertPageParamUrl(page);
    if (sort) {
      url += this.convertSortParamUrl(sort);
    }
    if (filter) {
      filter.keyword && (url += this.convertParamUrl('filter', filter.keyword));
      filter.type && (url += this.convertParamUrl('page_id', filter.type));
      filter.position &&
        (url += this.convertParamUrl('position_id', filter.position));
      filter.status && (url += this.convertParamUrl('media_st', filter.status));
    }

    return this.requestGet(url);
  }

  public getMediaImageDetail(id: string) {
    return this.requestGet(`${this.baseAPI}/GetMediaById?id=${id}`);
  }

  public createOrEditMediaImage(body: any) {
    return this.requestPost(body, `${this.baseAPI}/SetMedia`);
  }
}
