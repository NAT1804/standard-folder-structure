import { Component, OnInit } from '@angular/core';
import { IConstant, IDropdown } from '@app/data/interfaces/interface';
import { BaseComponent } from '@app/modules/base-component/base-component.component';
import { STATUS_RESPONSE } from '@app/shared/constants/app.const';
import { SettingDayOfModel } from '../../model/SettingDayOff.model';
import { SettingDayOffService } from '../../service/setting-day-off.service';

export const MAX_DAY_OF_MONTH = 37;

@Component({
  selector: 'ecore-setting-day-off',
  templateUrl: './setting-day-off.component.html',
  styleUrls: ['./setting-day-off.component.scss'],
})
export class SettingDayOffComponent extends BaseComponent implements OnInit {
  public selectYear: number;
  public listYear: IDropdown[] = [];
  public listDayOfWeek: IConstant[] = [];
  public listMonth: IConstant[] = [];
  public dataSource: SettingDayOfModel[][] = [];
  public selectedDatas: SettingDayOfModel[] = [];

  constructor(private settingDayOffService: SettingDayOffService) {
    super();
  }

  ngOnInit() {
    this.initData();
    this.getData();
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
    this.listMonth = [
      { id: 1, name: 'Jan' },
      { id: 2, name: 'Feb' },
      { id: 3, name: 'Mar' },
      { id: 4, name: 'Apr' },
      { id: 5, name: 'May' },
      { id: 6, name: 'Jun' },
      { id: 7, name: 'Jul' },
      { id: 8, name: 'Aug' },
      { id: 9, name: 'Sep' },
      { id: 10, name: 'Oct' },
      { id: 11, name: 'Nov' },
      { id: 12, name: 'Dec' },
    ] as IConstant[];
  }

  public onChange(event: any) {
    if (event) {
      this.getData();
    }
  }

  private getData() {
    this.spinnerService.showSpinner();
    this.settingDayOffService.getListDayOff(this.selectYear).subscribe(
      (res) => {
        this.spinnerService.removeSpinner();
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          const result: SettingDayOfModel[][] = [[]];
          // get <th>
          for (let index = 0; index < MAX_DAY_OF_MONTH; index++) {
            result[0].push({
              dayOfMonth: index + 1,
              dayOfWeek: this.listDayOfWeek[index % 7].name,
            } as SettingDayOfModel);
          }

          // get <td>
          res.data.forEach((d: any) => {
            const date = new Date(d.working_date);
            const dto = {
              date: date,
              dateRaw: d.working_date,
              dayOfMonth: date.getDate(),
              month: date.getMonth() + 1,
              dayOfWeekIndex: this.listDayOfWeek.findIndex(
                (e: IConstant) => e.id === d.working_date_name
              ),
              isDayOff: d.is_day_off,
              isSelected: false,
            } as SettingDayOfModel;
            if (!result[dto.month] || !result[dto.month].length) {
              result[dto.month] = [];
            }
            result[dto.month].push(dto);
            if (result[dto.month].length === 1 && dto.dayOfWeekIndex !== 0) {
              for (let index = 0; index < dto.dayOfWeekIndex; index++) {
                result[dto.month].unshift(new SettingDayOfModel());
              }
            }
          });

          this.selectedDatas = [];
          this.dataSource = result;
        }
      },
      () => {
        this.spinnerService.removeSpinner();
      }
    );
  }

  public getMonth(month: number) {
    return this.listMonth.find((e: IConstant) => e.id === month)?.name || '';
  }

  public onClickTd(event: any, data: SettingDayOfModel) {
    if (event) {
      data.isSelected = !data.isSelected;
      if (data.isSelected) {
        this.selectedDatas.push(data);
      } else {
        this.selectedDatas = this.selectedDatas.filter(
          (data: SettingDayOfModel) => data.date !== data.date
        );
      }
    }
  }

  public onClickSave(event: any) {
    if (event) {
      if (!this.selectedDatas.length) {
        this.toastService.showToastWarning('Cần chọn ngày thay đổi!');
      } else {
        this.dialogCommonService.createConfirmDialog(
          'Thay đổi cấu hình ngày nghỉ lễ',
          'Chắc chắn thay đổi cấu hình ngày nghỉ lễ những ngày đã chọn',
          () => {
            const body = {
              itemSets: this.selectedDatas.map((data: SettingDayOfModel) => ({
                dateTimes: data.dateRaw,
                is_day_off: !data.isDayOff,
              })),
            };
            this.settingDayOffService
              .changeDayOff(body)
              .subscribe((res: any) => {
                if (res.status === STATUS_RESPONSE.SUCCESS) {
                  this.toastService.showToastSucess(
                    'Thay đổi cấu hình ngày nghỉ lễ thành công'
                  );
                  this.getData();
                }
              });
          },
          () => {
            console.log('reject');
          }
        );
      }
    }
  }
}
