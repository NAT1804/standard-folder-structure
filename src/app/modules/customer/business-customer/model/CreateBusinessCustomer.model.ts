import {
  DataValidator,
  Validator,
  ValidatorItem,
} from '@app/data/model/validation';
import { formatDateToAPI } from '@app/shared/function-common';

export const mess_taxCode = 'Vui lòng nhập Mã số thuế';
export const mess_name = 'Vui lòng nhập Tên doanh nghiệp';
export const mess_bank = 'Vui lòng nhập Ngân hàng';
export const mess_accountNumber = 'Vui lòng nhập Số tài khoản';
export const mess_accountName = 'Vui lòng nhập Tên tài khoản';

export class CreateBusinessCustomerModel {
  public avatar = String('');
  public taxCode = String('');
  public taxCodePlace = String('');
  public taxCodeDate: Date | any = undefined;
  public name = String('');
  public abbreviation = String('');
  public email = String('');
  public phone = String('');
  public address = String('');
  public representative = String('');
  public representativePosition = String('');
  public bank = String('');
  public accountNumber = String('');
  public bankBranch = String('');
  public accountName = String('');
  protected _dataValidator: DataValidator = new DataValidator();

  public get dataValidator() {
    return this._dataValidator;
  }

  protected isValidTaxCode() {
    const field = 'taxCode';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.taxCode,
      this._dataValidator[field],
      mess_taxCode
    );
  }

  protected isValidName() {
    const field = 'name';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.name,
      this._dataValidator[field],
      mess_name
    );
  }

  protected isValidBank() {
    const field = 'bank';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.bank,
      this._dataValidator[field],
      mess_bank
    );
  }

  protected isValidAccountNumber() {
    const field = 'accountNumber';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.accountNumber,
      this._dataValidator[field],
      mess_accountNumber
    );
  }

  protected isValidAccountName() {
    const field = 'accountName';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.accountName,
      this._dataValidator[field],
      mess_accountName
    );
  }

  public isValidData() {
    return (
      this.isValidTaxCode() &&
      this.isValidName() &&
      this.isValidBank() &&
      this.isValidAccountNumber() &&
      this.isValidAccountName()
    );
  }

  public showValidateData(keyString: string) {
    switch (keyString) {
      case 'taxCode':
        return !this.isValidTaxCode();
      case 'name':
        return !this.isValidName();
      case 'bank':
        return !this.isValidBank();
      case 'accountNumber':
        return !this.isValidAccountNumber();
      case 'accountName':
        return !this.isValidAccountName();
    }
    return false;
  }

  public toObjectSendToAPI() {
    return {
      com_logo: this.avatar,
      com_tax_code: this.taxCode,
      com_tax_code_by: this.taxCodePlace,
      com_tax_code_dt: this.taxCodeDate
        ? formatDateToAPI(this.taxCodeDate)
        : undefined,
      com_name: this.name,
      com_name_short: this.abbreviation,
      com_address: this.address,
      com_rep_name: this.representative,
      com_rep_position: this.representativePosition,
    };
  }
}
