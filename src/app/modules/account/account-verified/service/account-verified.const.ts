import { ETypeStatus, SEVERITY } from '@app/core/constants/app.const';
import { IDropdown } from '@app/data/interfaces/interface';

export class AccountVerifiedConst {
  public static lisTAccountCreationSource: IDropdown[] = [
    {
      value: 1,
      label: 'Khách hàng',
    },
    {
      value: 2,
      label: 'Quản trị viên',
    },
    {
      value: 3,
      label: 'Sale',
    },
  ];

  public static HOAT_DONG = 1;
  public static DANG_KHOA = 2;
  public static TAM_KHOA = 3;
  public static listStatus: IDropdown[] = [
    {
      value: this.HOAT_DONG,
      label: 'Hoạt động',
      severity: SEVERITY.SUCCESS,
    },
    {
      value: this.DANG_KHOA,
      label: 'Đang khóa',
      severity: SEVERITY.WARNING,
    },
    {
      value: this.TAM_KHOA,
      label: 'Tạm khóa',
      severity: SEVERITY.DANGER,
    },
  ];

  public static getStatus(code: number, atribution = ETypeStatus.LABEL) {
    const status = this.listStatus.find((status) => status.value === code);
    return status ? status[atribution] : '';
  }
}
