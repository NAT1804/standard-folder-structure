import { IDropdown } from '@app/data/interfaces/interface';

export class IndividualCustomerConst {
  public static TYPE_INDIVIDUAL_CUSTOMER = 0;

  public static NAM = true;
  public static NU = false;
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

  public static tabDetailGeneral = Number(0);
}
