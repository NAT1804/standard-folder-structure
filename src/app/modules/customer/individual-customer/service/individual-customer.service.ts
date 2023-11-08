import { Injectable } from '@angular/core';
import { ISortTable } from '@app/data/interfaces/interface';
import { Page } from '@app/data/model/page';
import { BaseService } from '@app/shared/services/base.service';

@Injectable()
export class IndividualCustomerService extends BaseService {
  private readonly baseAPI = '/api/v1/custinfo';

  public getListIndividualCustomer(page: Page, filter: any, sort?: ISortTable) {
    let url = String(this.baseAPI + '/GetCustInfoPage?');
    url += this.convertPageParamUrl(page);

    return this.requestGet(
      this.baseAPI + '/GetCustInfoPage?offSet=20&pageSize=1'
    );
  }

  public createIndividualCustomer(body: any) {
    return this.requestPost(body, `${this.baseAPI}/SetCustInfo`);
  }
}
