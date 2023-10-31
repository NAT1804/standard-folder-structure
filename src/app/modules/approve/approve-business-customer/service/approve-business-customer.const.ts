import { IDropdown } from '@app/data/interfaces/interface';
import { ETypeStatus, SEVERITY } from '@app/shared/constants/app.const';

export class ApproveBusinessCustomerConst {
  public static KHOI_TAO = 1;
  public static TRINH_DUYET = 2;
  public static DA_DUYET = 3;
  public static HUY_DUYET = 4;
  public static listStatus: IDropdown[] = [
    {
      value: this.KHOI_TAO,
      label: 'Khởi tạo',
      severity: SEVERITY.SUCCESS,
    },
    {
      value: this.TRINH_DUYET,
      label: 'Trình duyệt',
      severity: SEVERITY.PRIMARY,
    },
    {
      value: this.DA_DUYET,
      label: 'Đã duyệt',
      severity: SEVERITY.INFO,
    },
    {
      value: this.HUY_DUYET,
      label: 'Hủy duyệt',
      severity: SEVERITY.DANGER,
    },
  ];

  public static getStatus(code: number, atribution = ETypeStatus.LABEL) {
    const status = this.listStatus.find((status) => status.value === code);
    return status ? status[atribution] : '';
  }

  public static THEM_MOI = 1;
  public static CHINH_SUA = 2;
  public static listAction: IDropdown[] = [
    {
      value: this.THEM_MOI,
      label: 'Khởi tạo',
    },
    {
      value: this.CHINH_SUA,
      label: 'Chỉnh sửa',
    },
  ];
}
