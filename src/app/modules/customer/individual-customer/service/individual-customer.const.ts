import { IDropdown } from '@app/data/interfaces/interface';

export class IndividualCustomerConst {
  public static NAM = 'True';
  public static NU = 'False';
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
