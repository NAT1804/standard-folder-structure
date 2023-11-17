import { IDropdown, ISortTable } from '@app/data/interfaces/interface';
import { Page } from '@app/data/model/page';
import { STATUS_RESPONSE } from '@app/shared/constants/app.const';
import { mapDropdownDTOToIDropdown } from '@app/shared/function-common';
import { BaseService } from '@app/shared/services/base.service';
import { BehaviorSubject, Observable } from 'rxjs';

export class ApproveIndividualCustomerService extends BaseService {
  private readonly baseAPI = '/api/v1/custinfo';
  public _listFilterIndividualCustomer: BehaviorSubject<
    IDropdown[] | undefined
  >;
  public _listFilterIndividualCustomer$: Observable<IDropdown[] | undefined>;
  public _listActionIndividualCustomer: BehaviorSubject<
    IDropdown[] | undefined
  >;
  public _listActionIndividualCustomer$: Observable<IDropdown[] | undefined>;
  public _listStatusIndividualCustomer: BehaviorSubject<
    IDropdown[] | undefined
  >;
  public _listStatusIndividualCustomer$: Observable<IDropdown[] | undefined>;

  constructor() {
    super();

    this._listFilterIndividualCustomer = new BehaviorSubject<
      IDropdown[] | undefined
    >(undefined);
    this._listFilterIndividualCustomer$ =
      this._listFilterIndividualCustomer.asObservable();
    this._listActionIndividualCustomer = new BehaviorSubject<
      IDropdown[] | undefined
    >(undefined);
    this._listActionIndividualCustomer$ =
      this._listActionIndividualCustomer.asObservable();
    this._listStatusIndividualCustomer = new BehaviorSubject<
      IDropdown[] | undefined
    >(undefined);
    this._listStatusIndividualCustomer$ =
      this._listStatusIndividualCustomer.asObservable();
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

  public getListActionIndividualCustomer() {
    this.requestGet(String(this.baseAPI + '/GetActionCust')).subscribe(
      (res: any) => {
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          this._listActionIndividualCustomer.next(
            mapDropdownDTOToIDropdown(res.data)
          );
        }
      }
    );
  }

  public getListStatusIndividualCustomer() {
    this.requestGet(String(this.baseAPI + '/GetApproveCust')).subscribe(
      (res: any) => {
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          this._listStatusIndividualCustomer.next(
            mapDropdownDTOToIDropdown(res.data)
          );
        }
      }
    );
  }

  public getListApproveIndividualCustomer(
    page: Page,
    filter: any,
    sort?: ISortTable
  ) {
    let url = String(this.baseAPI + '/GetCustInfoApprovePage?');
    url += this.convertPageParamUrl(page);
    if (sort) {
      url += this.convertSortParamUrl(sort);
    }
    if (filter) {
      filter.keyword && (url += this.convertParamUrl('filter', filter.keyword));
      filter.type && (url += this.convertParamUrl('filterType', filter.type));
      filter.action && (url += this.convertParamUrl('action', filter.action));
      filter.status &&
        (url += this.convertParamUrl('approve_st', filter.status));
    }

    return this.requestGet(url);
  }

  public approveIndividualCustomer(
    id: string,
    customerId: string,
    note: string
  ) {
    return this.requestPut(
      { id, custId: customerId, remark: note },
      `${this.baseAPI}/CustInfoSubmit`
    );
  }

  public requestIndividualCustomer(
    type: string,
    id: string,
    customerId: string,
    note: string
  ) {
    return this.requestPut(
      { action: type, id, custId: customerId, remark: note },
      `${this.baseAPI}/CustInfoApproved`
    );
  }
}
