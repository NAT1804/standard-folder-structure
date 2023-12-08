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
  }

  public getListPageMediaImage() {
    this.requestGet(String(this.baseAPI + '/GetMediaAppPage')).subscribe(
      (res: any) => {
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          this._listPageMediaImage.next(mapDropdownDTOToIDropdown(res.data));
        }
      }
    );
  }

  public getListPositionMediaImage(pageId: string) {
    this.requestGet(
      String(this.baseAPI + '/GetMediaAppPage?page_id=' + pageId)
    ).subscribe((res: any) => {
      if (res.status === STATUS_RESPONSE.SUCCESS) {
        this._listPositionMediaImage.next(mapDropdownDTOToIDropdown(res.data));
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
            mapDropdownDTOToIDropdown(res.data)
          );
        }
      }
    );
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
}
