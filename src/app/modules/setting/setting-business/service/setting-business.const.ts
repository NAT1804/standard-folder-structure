import { IDropdown } from '@app/data/interfaces/interface';
import { ETypeStatus, SEVERITY } from '@app/shared/constants/app.const';

export class SettingBusinessConst {
  public static HOAT_DONG = 1;
  public static KHOA = 2;
  public static listStatus: IDropdown[] = [
    {
      value: this.HOAT_DONG,
      label: 'Hoạt động',
      severity: SEVERITY.SUCCESS,
    },
    {
      value: this.KHOA,
      label: 'Khóa',
      severity: SEVERITY.WARNING,
    },
  ];

  public static getStatus(code: number, atribution = ETypeStatus.LABEL) {
    const status = this.listStatus.find((status) => status.value === code);
    return status ? status[atribution] : '';
  }
}
