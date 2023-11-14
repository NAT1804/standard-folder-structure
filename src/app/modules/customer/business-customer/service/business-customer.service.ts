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
export class BusinessCustomerService extends BaseService {
  private readonly baseAPI = '/api/v1/custinfo';
  private readonly baseAPIBank = '/api/v1/accountbank';
  private readonly baseAPIFile = '/api/v1/custFile';
  private readonly key = 'company_filter';
  public _listFilterBusinessCustomer: BehaviorSubject<IDropdown[] | undefined>;
  public _listFilterBusinessCustomer$: Observable<IDropdown[] | undefined>;
  public _listStatusBusinessCustomer: BehaviorSubject<IDropdown[] | undefined>;
  public _listStatusBusinessCustomer$: Observable<IDropdown[] | undefined>;
  public businessCustomerId: string | undefined;
  public isEdit = Boolean(false);
  public _handleEventSave: BehaviorSubject<boolean | undefined>;
  public _handleEventSave$: Observable<boolean | undefined>;

  constructor() {
    super();

    this._listFilterBusinessCustomer = new BehaviorSubject<
      IDropdown[] | undefined
    >(undefined);
    this._listFilterBusinessCustomer$ =
      this._listFilterBusinessCustomer.asObservable();
    this._listStatusBusinessCustomer = new BehaviorSubject<
      IDropdown[] | undefined
    >(undefined);
    this._listStatusBusinessCustomer$ =
      this._listStatusBusinessCustomer.asObservable();
    this._handleEventSave = new BehaviorSubject<boolean | undefined>(undefined);
    this._handleEventSave$ = this._handleEventSave.asObservable();
  }

  public getListFilterBusinessCustomer() {
    this.requestGet(
      String(this.baseAPI + '/GetFilterType?key=' + this.key)
    ).subscribe((res: any) => {
      if (res.status === STATUS_RESPONSE.SUCCESS) {
        this._listFilterBusinessCustomer.next(
          mapDropdownDTOToIDropdown(res.data)
        );
      }
    });
  }

  public getListStatusBusinessCustomer() {
    this.requestGet(
      String(this.baseAPI + '/GetCustStatus?key=' + this.key)
    ).subscribe((res: any) => {
      if (res.status === STATUS_RESPONSE.SUCCESS) {
        this._listStatusBusinessCustomer.next(
          mapDropdownDTOToIDropdown(res.data)
        );
      }
    });
  }

  public getListBusinessCustomer(page: Page, filter: any, sort?: ISortTable) {
    let url = String(this.baseAPI + '/GetCompanyCustInfoPage?');
    url += this.convertPageParamUrl(page);
    if (sort) {
      url += this.convertSortParamUrl(sort);
    }
    if (filter) {
      filter.keyword &&
        (url += this.convertParamUrl('keyword', filter.keyword));
      filter.type && (url += this.convertParamUrl('filterType', filter.type));
      filter.status && (url += this.convertParamUrl('custSt', filter.status));
    }

    return this.requestGet(url);
  }

  public getBusinessCustomerDetail(id: string) {
    const url = String(this.baseAPI + '/GetCompanyCustInfoById?custId=' + id);
    return this.requestGet(url);
  }

  public createOrEditBusinessCustomer(body: any) {
    return this.requestPost(body, `${this.baseAPI}/SetCompanyCustInfo`);
  }

  public getBusiCusDetailBank(id: string) {
    let url = String(this.baseAPIBank + '/GetCustAccountBankByCustId?');
    url += this.convertParamUrl('custId', id);
    return this.requestGet(url);
  }

  public getBusiCusDetailBankDetail(id: string) {
    let url = String(this.baseAPIBank + '/GetCustAccountBankById?');
    url += this.convertParamUrl('id', id);
    return this.requestGet(url);
  }

  public createOrEditBusiCusDetailBank(body: any) {
    return this.requestPost(body, `${this.baseAPIBank}/SetCustAccountBankInfo`);
  }

  public createOrEditBusiCusDetailFile(body: any) {
    return this.requestPost(body, `${this.baseAPIFile}/SetCustFileInfo`);
  }
}
