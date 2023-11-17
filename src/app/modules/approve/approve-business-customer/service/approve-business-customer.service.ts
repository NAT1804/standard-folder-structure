import { IDropdown, ISortTable } from '@app/data/interfaces/interface';
import { Page } from '@app/data/model/page';
import { STATUS_RESPONSE } from '@app/shared/constants/app.const';
import { mapDropdownDTOToIDropdown } from '@app/shared/function-common';
import { BaseService } from '@app/shared/services/base.service';
import { BehaviorSubject, Observable } from 'rxjs';

export class ApproveBusinessCustomerService extends BaseService {
  private readonly baseAPI = '/api/v1/custinfo';
  private readonly key = 'company_filter';
  public _listFilterBusinessCustomer: BehaviorSubject<IDropdown[] | undefined>;
  public _listFilterBusinessCustomer$: Observable<IDropdown[] | undefined>;
  public _listActionBusinessCustomer: BehaviorSubject<IDropdown[] | undefined>;
  public _listActionBusinessCustomer$: Observable<IDropdown[] | undefined>;
  public _listStatusBusinessCustomer: BehaviorSubject<IDropdown[] | undefined>;
  public _listStatusBusinessCustomer$: Observable<IDropdown[] | undefined>;

  constructor() {
    super();

    this._listFilterBusinessCustomer = new BehaviorSubject<
      IDropdown[] | undefined
    >(undefined);
    this._listFilterBusinessCustomer$ =
      this._listFilterBusinessCustomer.asObservable();
    this._listActionBusinessCustomer = new BehaviorSubject<
      IDropdown[] | undefined
    >(undefined);
    this._listActionBusinessCustomer$ =
      this._listActionBusinessCustomer.asObservable();
    this._listStatusBusinessCustomer = new BehaviorSubject<
      IDropdown[] | undefined
    >(undefined);
    this._listStatusBusinessCustomer$ =
      this._listStatusBusinessCustomer.asObservable();
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

  public getListActionBusinessCustomer() {
    this.requestGet(String(this.baseAPI + '/GetActionCust')).subscribe(
      (res: any) => {
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          this._listActionBusinessCustomer.next(
            mapDropdownDTOToIDropdown(res.data)
          );
        }
      }
    );
  }

  public getListStatusBusinessCustomer() {
    this.requestGet(String(this.baseAPI + '/GetApproveCust')).subscribe(
      (res: any) => {
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          this._listStatusBusinessCustomer.next(
            mapDropdownDTOToIDropdown(res.data)
          );
        }
      }
    );
  }

  public getListApproveBusinessCustomer(
    page: Page,
    filter: any,
    sort?: ISortTable
  ) {
    let url = String(this.baseAPI + '/GetCustInfoApprovePage?');
    url += this.convertParamUrl('custType', 1);
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

  public approveBusinessCustomer(id: string, customerId: string, note: string) {
    return this.requestPut(
      { id, custId: customerId, remark: note },
      `${this.baseAPI}/CustInfoSubmit`
    );
  }

  public requestBusinessCustomer(
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
