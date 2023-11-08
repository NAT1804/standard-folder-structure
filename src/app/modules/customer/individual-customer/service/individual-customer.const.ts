import { ETypeStatus, SEVERITY } from '@app/shared/constants/app.const';
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

  public static NAM = 1;
  public static NU = 2;
  public static listGender: IDropdown[] = [
    {
      value: this.NAM,
      label: 'Nam',
    },
    {
      value: this.NU,
      label: 'Nữ',
    },
  ];

  public static listCheck: IDropdown[] = [
    {
      value: true,
      label: 'Đã kiểm tra',
    },
    {
      value: false,
      label: 'Chưa kiểm tra',
    },
  ];

  public static listFilterType: IDropdown[] = [
    {
      value: 1,
      label: 'Mã khách hàng',
    },
    {
      value: 2,
      label: 'Số điện thoại',
    },
    {
      value: 3,
      label: 'Email',
    },
    {
      value: 4,
      label: 'Họ tên',
    },
  ];
}
