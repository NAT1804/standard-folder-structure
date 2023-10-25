import { ETypeStatus, SEVERITY } from '@app/core/constants/app.const';
import { IDropdown } from '@app/data/interfaces/interface';

export class IndividualCustomerConst {
  public static listCreateSource: IDropdown[] = [
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
  public static CHO_XU_LY = 2;
  public static listStatus: IDropdown[] = [
    {
      value: this.HOAT_DONG,
      label: 'Hoạt động',
      severity: SEVERITY.SUCCESS,
    },
    {
      value: this.CHO_XU_LY,
      label: 'Chờ xử lý',
      severity: SEVERITY.WARNING,
    },
  ];

  public static getStatus(code: number, atribution = ETypeStatus.LABEL) {
    const status = this.listStatus.find((status) => status.value === code);
    return status ? status[atribution] : '';
  }
}
