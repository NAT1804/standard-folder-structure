import { Component, OnInit } from '@angular/core';
import { IConstant, IDropdown } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { STATUS_RESPONSE } from '@app/shared/constants/app.const';
import { SettingDayOfModel } from '../../model/SettingDayOff.model';
import { SettingDayOffService } from '../../service/setting-day-off.service';

@Component({
  selector: 'ecore-setting-day-off',
  templateUrl: './setting-day-off.component.html',
  styleUrls: ['./setting-day-off.component.scss'],
})
export class SettingDayOffComponent extends BaseComponent implements OnInit {
  public selectYear: number;
  public listYear: IDropdown[] = [];
  public listDayOfWeek: IConstant[] = [];
  public dataSource: SettingDayOfModel[] = [];

  constructor(private settingDayOffService: SettingDayOffService) {
    super();
  }

  ngOnInit() {
    this.initData();
  }

  private initData() {
    const currentDate = new Date();
    this.selectYear = currentDate.getFullYear();
    for (let index = -10; index <= 10; index++) {
      const value = this.selectYear + index;
      this.listYear.push({
        value: value,
        label: value + '',
      } as IDropdown);
    }
    this.listDayOfWeek = [
      {
        id: 'Sunday',
        name: 'Sun',
      },
      {
        id: 'Monday',
        name: 'Mon',
      },
      {
        id: 'Tuesday',
        name: 'Tue',
      },
      {
        id: 'Wednesday',
        name: 'Wed',
      },
      {
        id: 'Thursday',
        name: 'Thu',
      },
      {
        id: 'Friday',
        name: 'Fri',
      },
      {
        id: 'Saturday',
        name: 'Sat',
      },
      {
        id: 'Sunday',
        name: 'Sun',
      },
    ] as IConstant[];
  }

  private getData() {
    this.settingDayOffService
      .getListDayOff(this.selectYear)
      .subscribe((res) => {
        this.spinnerService.removeSpinner();
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          // this.dataSource = res.data.map()
        }
      });
  }
}
