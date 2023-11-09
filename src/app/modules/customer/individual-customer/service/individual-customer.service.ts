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
export class IndividualCustomerService extends BaseService {
  private readonly baseAPI = '/api/v1/custinfo';
  private readonly baseAPIBank = '/api/v1/accountbank';
  public _listFilterIndividualCustomer: BehaviorSubject<
    IDropdown[] | undefined
  >;
  public _listFilterIndividualCustomer$: Observable<IDropdown[] | undefined>;
  public _listCheckIndividualCustomer: BehaviorSubject<IDropdown[] | undefined>;
  public _listCheckIndividualCustomer$: Observable<IDropdown[] | undefined>;
  public _listSourceIndividualCustomer: BehaviorSubject<
    IDropdown[] | undefined
  >;
  public _listSourceIndividualCustomer$: Observable<IDropdown[] | undefined>;
  public _listStatusIndividualCustomer: BehaviorSubject<
    IDropdown[] | undefined
  >;
  public _listStatusIndividualCustomer$: Observable<IDropdown[] | undefined>;
  public _listIdTypeIndividualCustomer: BehaviorSubject<
    IDropdown[] | undefined
  >;
  public _listIdTypeIndividualCustomer$: Observable<IDropdown[] | undefined>;
  public individualCustomerId: string | undefined;

  constructor() {
    super();

    this._listFilterIndividualCustomer = new BehaviorSubject<
      IDropdown[] | undefined
    >(undefined);
    this._listFilterIndividualCustomer$ =
      this._listFilterIndividualCustomer.asObservable();
    this._listCheckIndividualCustomer = new BehaviorSubject<
      IDropdown[] | undefined
    >(undefined);
    this._listCheckIndividualCustomer$ =
      this._listCheckIndividualCustomer.asObservable();
    this._listSourceIndividualCustomer = new BehaviorSubject<
      IDropdown[] | undefined
    >(undefined);
    this._listSourceIndividualCustomer$ =
      this._listSourceIndividualCustomer.asObservable();
    this._listStatusIndividualCustomer = new BehaviorSubject<
      IDropdown[] | undefined
    >(undefined);
    this._listStatusIndividualCustomer$ =
      this._listStatusIndividualCustomer.asObservable();
    this._listIdTypeIndividualCustomer = new BehaviorSubject<
      IDropdown[] | undefined
    >(undefined);
    this._listIdTypeIndividualCustomer$ =
      this._listIdTypeIndividualCustomer.asObservable();
  }

  public getListFilterIndividualCustomer() {
    this.requestGet(String(this.baseAPI + '/GetFilterType')).subscribe(
      (res: any) => {
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          this._listFilterIndividualCustomer.next(
            mapDropdownDTOToIDropdown(res.data)
          );
        }
      }
    );
  }

  public getListCheckIndividualCustomer() {
    this.requestGet(String(this.baseAPI + '/GetCheck')).subscribe(
      (res: any) => {
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          this._listCheckIndividualCustomer.next(
            mapDropdownDTOToIDropdown(res.data)
          );
        }
      }
    );
  }

  public getListSourceIndividualCustomer() {
    this.requestGet(String(this.baseAPI + '/GetCustSource')).subscribe(
      (res: any) => {
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          this._listSourceIndividualCustomer.next(
            mapDropdownDTOToIDropdown(res.data)
          );
        }
      }
    );
  }

  public getListStatusIndividualCustomer() {
    this.requestGet(String(this.baseAPI + '/GetCustStatus')).subscribe(
      (res: any) => {
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          this._listStatusIndividualCustomer.next(
            mapDropdownDTOToIDropdown(res.data)
          );
        }
      }
    );
  }

  public getListIdTypeIndividualCustomer() {
    this.requestGet(String(this.baseAPI + '/GetIdCardType')).subscribe(
      (res: any) => {
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          this._listIdTypeIndividualCustomer.next(
            mapDropdownDTOToIDropdown(res.data)
          );
        }
      }
    );
  }

  public getListIndividualCustomer(page: Page, filter: any, sort?: ISortTable) {
    let url = String(this.baseAPI + '/GetCustInfoPage?');
    url += this.convertPageParamUrl(page);
    if (sort) {
      url += this.convertSortParamUrl(sort);
    }
    if (filter) {
      filter.keyword &&
        (url += this.convertParamUrl('keyword', filter.keyword));
      filter.type && (url += this.convertParamUrl('filterType', filter.type));
      filter.check &&
        (url += this.convertParamUrl('is_check', filter.check === '0'));
      filter.source &&
        (url += this.convertParamUrl('custSource', filter.source));
      filter.status && (url += this.convertParamUrl('custSt', filter.status));
    }

    return this.requestGet(url);
  }

  public getIndividualCustomerDetail(id: string) {
    const url = String(this.baseAPI + '/GetCustInfoById?custId=' + id);
    return this.requestGet(url);
  }

  public createIndividualCustomer(body: any) {
    return this.requestPost(
      {
        cust: body,
      },
      `${this.baseAPI}/SetCustInfo`
    );
  }

  public getIndiCusDetailBank(id: string) {
    let url = String(this.baseAPIBank + '/GetCustAcccountBankById?');
    url += this.convertParamUrl('custId', id);
    return this.requestGet(url);
  }
}
