import { IDropdown } from '@app/data/interfaces/interface';

export class IndividualCustomerConst {
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
}
