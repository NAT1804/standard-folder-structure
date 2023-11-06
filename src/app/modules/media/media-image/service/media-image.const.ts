import { IDropdown } from '@app/data/interfaces/interface';
import { ETypeStatus, SEVERITY } from '@app/shared/constants/app.const';

export class MediaImageConst {
  public static KHOI_TAO = 1;
  public static DA_DANG = 2;
  public static listStatus: IDropdown[] = [
    {
      value: this.KHOI_TAO,
      label: 'Khởi tạo',
      severity: SEVERITY.SUCCESS,
    },
    {
      value: this.DA_DANG,
      label: 'Đã đăng',
      severity: SEVERITY.WARNING,
    },
  ];

  public static getStatus(code: number, atribution = ETypeStatus.LABEL) {
    const status = this.listStatus.find((status) => status.value === code);
    return status ? status[atribution] : '';
  }
}
