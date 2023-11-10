import {
  DataValidator,
  Validator,
  ValidatorItem,
} from '@app/data/model/validation';

export const mess_bank = 'Vui lòng nhập Ngân hàng';
export const mess_accountNo = 'Vui lòng nhập Số tài khoản';
export const mess_accountName = 'Vui lòng nhập Tên tài khoản';

export class CrudIndiCusDetailBankModel {
  public id: string | undefined = undefined;
  public customerId = String('');
  public bank = String('');
  public accountNo = String('');
  public accountName = String('');
  public isDefault = Boolean(false);
  protected _dataValidator: DataValidator = new DataValidator();

  public get dataValidator() {
    return this._dataValidator;
  }

  private isValidBank() {
    const field = 'bank';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.bank,
      this._dataValidator[field],
      mess_bank
    );
  }

  private isValidAccountNo() {
    const field = 'accountNo';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.accountNo,
      this._dataValidator[field],
      mess_accountNo
    );
  }

  private isValidAccountName() {
    const field = 'accountName';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.accountName,
      this._dataValidator[field],
      mess_accountName
    );
  }

  public showValidateData(keyString: string) {
    switch (keyString) {
      case 'bank':
        return !this.isValidBank();
      case 'accountNo':
        return !this.isValidAccountNo();
      case 'accountName':
        return !this.isValidAccountName();
    }
    return false;
  }

  public isValidData() {
    return (
      this.isValidBank() && this.isValidAccountNo() && this.isValidAccountName()
    );
  }

  public toObjectSendToAPI() {
    return {
      id: this.id,
      custId: this.customerId,
      bank_code: this.bank,
      acc_no: this.accountNo,
      acc_name: this.accountName,
      is_default: !this.isDefault,
    };
  }

  public mapDTO(dto: any) {
    if (dto) {
      this.id = dto.id;
      this.bank = dto.bank_code;
      this.accountNo = dto.acc_no;
      this.accountName = dto.acc_name;
      this.isDefault = !!dto.is_default;
    }
  }
}
