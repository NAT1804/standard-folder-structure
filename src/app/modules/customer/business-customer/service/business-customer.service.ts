import { Injectable } from '@angular/core';
import { ISortTable } from '@app/data/interfaces/interface';
import { Page } from '@app/data/model/page';
import { BaseService } from '@app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class BusinessCustomerService extends BaseService {
  private readonly baseAPI = '/api/v1/custinfo';

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

  public createOrEditBusinessCustomer(body: any) {
    return this.requestPost(body, `${this.baseAPI}/SetCompanyCustInfo`);
  }
}
