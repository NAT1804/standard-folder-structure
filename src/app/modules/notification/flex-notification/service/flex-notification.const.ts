import { IDropdown } from '@app/data/interfaces/interface';
import { ETypeStatus, SEVERITY } from '@app/shared/constants/app.const';

export class FlexNotificationConst {
  public static KHOI_TAO = 1;
  public static DA_GUI = 2;
  public static listStatus: IDropdown[] = [
    {
      value: this.KHOI_TAO,
      label: 'Khởi tạo',
      severity: SEVERITY.SUCCESS,
    },
    {
      value: this.DA_GUI,
      label: 'Đã gửi',
      severity: SEVERITY.WARNING,
    },
  ];

  public static getStatus(code: number, atribution = ETypeStatus.LABEL) {
    const status = this.listStatus.find((status) => status.value === code);
    return status ? status[atribution] : '';
  }
}
