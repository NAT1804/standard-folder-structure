import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class SettingDayOffService extends BaseService {
  private readonly baseAPI = '/api/v1/calendar';

  public getListDayOff(year: number) {
    return this.requestGet(`${this.baseAPI}/GetCalendarByYear?year=${year}`);
  }
}
