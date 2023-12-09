import { Injectable } from '@angular/core';
import {
  DropdownDTO,
  IDropdown,
  ISortTable,
} from '@app/data/interfaces/interface';
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
  private readonly baseAPIContact = '/api/v1/custaddress';
  private readonly baseAPISale = '/api/v1/custsaler';
  private readonly baseAPIVerify = '/api/v1/custidcard';
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
  public individualCustomerApproveId: string | undefined;
  public isApprove = Boolean(false);
  public isEdit = Boolean(false);
  public _handleEventSave: BehaviorSubject<boolean | undefined>;
  public _handleEventSave$: Observable<boolean | undefined>;
  public showBtnCheck = Boolean(true);

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
    this._handleEventSave = new BehaviorSubject<boolean | undefined>(undefined);
    this._handleEventSave$ = this._handleEventSave.asObservable();
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
          const listIdTypeIndividualCustomer = res.data.map(
            (e: DropdownDTO) =>
              ({
                value: Number(e.value),
                label: e.name,
              }) as IDropdown
          );
          this._listIdTypeIndividualCustomer.next(listIdTypeIndividualCustomer);
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
      filter.keyword && (url += this.convertParamUrl('filter', filter.keyword));
      filter.type && (url += this.convertParamUrl('filterType', filter.type));
      filter.check &&
        (url += this.convertParamUrl('is_check', filter.check === '0'));
      filter.source &&
        (url += this.convertParamUrl('custSource', filter.source));
      filter.status && (url += this.convertParamUrl('custSt', filter.status));
    }

    return this.requestGet(url);
  }

  public getIndividualCustomerDetail(id: string, approveId?: string) {
    let url = String(this.baseAPI + '/GetCustInfoById?');
    url += this.convertParamUrl('custId', id);
    approveId && (url += this.convertParamUrl('id', approveId));
    return this.requestGet(url);
  }

  public createOrEditIndividualCustomer(body: any) {
    return this.requestPost(body, `${this.baseAPI}/SetCustInfo`);
  }

  public checkCustomer(customerId: string) {
    return this.requestPut(
      { custId: customerId },
      `${this.baseAPI}/CustInfoCheck`
    );
  }

  public getIndiCusDetailBank(id: string) {
    let url = String(this.baseAPIBank + '/GetCustAccountBankByCustId?');
    url += this.convertParamUrl('custId', id);
    return this.requestGet(url);
  }

  public getIndiCusDetailBankDetail(id: string) {
    let url = String(this.baseAPIBank + '/GetCustAccountBankById?');
    url += this.convertParamUrl('id', id);
    return this.requestGet(url);
  }

  public createOrEditIndiCusDetailBank(body: any) {
    return this.requestPost(body, `${this.baseAPIBank}/SetCustAccountBankInfo`);
  }

  public getIndiCusDetailContact(id: string) {
    let url = String(this.baseAPIContact + '/GetCustAddressByCustId?');
    url += this.convertParamUrl('custId', id);
    return this.requestGet(url);
  }

  public getIndiCusDetailContactDetail(id: string) {
    let url = String(this.baseAPIContact + '/GetCustAddressById?');
    url += this.convertParamUrl('id', id);
    return this.requestGet(url);
  }

  public createOrEditIndiCusDetailContact(body: any) {
    return this.requestPost(body, `${this.baseAPIContact}/SetCustAddressInfo`);
  }

  public getIndiCusDetailSale(id: string) {
    let url = String(this.baseAPISale + '/GetCustSalerByCustId?');
    url += this.convertParamUrl('custId', id);
    return this.requestGet(url);
  }

  public getIndiCusDetailSaleDetail(id: string) {
    let url = String(this.baseAPISale + '/GetCustSalerById?');
    url += this.convertParamUrl('id', id);
    return this.requestGet(url);
  }

  public createOrEditIndiCusDetailSale(body: any) {
    return this.requestPost(body, `${this.baseAPISale}/SetCustSalerInfo`);
  }

  public verifySale(referralCode: string) {
    return this.requestPost(
      {
        referral_saler_code: referralCode,
      },
      `${this.baseAPI}/CheckRefferalCode`
    );
  }

  public getIndiCusDetailVerify(id: string) {
    let url = String(this.baseAPIVerify + '/GetCustIdCardByCustId?');
    url += this.convertParamUrl('custId', id);
    return this.requestGet(url);
  }

  public getIndiCusDetailSaleVerify(id: string) {
    let url = String(this.baseAPIVerify + '/GetCustIdCardById?');
    url += this.convertParamUrl('id', id);
    return this.requestGet(url);
  }

  public createOrEditIndiCusDetailVerify(body: any) {
    return this.requestPost(body, `${this.baseAPIVerify}/SetCustIdCardInfo`);
  }
}
