import {
  DataValidator,
  Validator,
  ValidatorItem,
} from '@app/data/model/validation';

export const mess_code = 'Vui lòng nhập Mã doanh nghiệp';
export const mess_taxCode = 'Vui lòng nhập Mã số thuế';
export const mess_taxCodePlace = 'Vui lòng nhập Nơi cấp';
export const mess_taxCodeDate = 'Vui lòng nhập Ngày cấp';
export const mess_name = 'Vui lòng nhập Tên doanh nghiệp';
export const mess_abbreviation = 'Vui lòng nhập Tên viết tắt';
export const mess_registerAddress = 'Vui lòng nhập Địa chỉ đăng ký';
export const mess_transactionAddress = 'Vui lòng nhập Địa chỉ giao dịch';
export const mess_nation = 'Vui lòng nhập Quốc gia';
export const mess_representative = 'Vui lòng nhập Người đại diện';
export const mess_bank = 'Vui lòng nhập Ngân hàng';
export const mess_accountNumber = 'Vui lòng nhập Số tài khoản';
export const mess_accountName = 'Vui lòng nhập Tên tài khoản';

export class CreateBusinessCustomerModel {
  public code = String('');
  public taxCode = String('');
  public taxCodePlace = String('');
  public taxCodeDate: Date | any = undefined;
  public timesChange: number | undefined = undefined;
  public dateChange: Date | any = undefined;
  public name = String('');
  public abbreviation = String('');
  public authorizedCapital: number | undefined = undefined;
  public email = String('');
  public phone = String('');
  public otherPhone = String('');
  public website = String('');
  public facebook = String('');
  public registerAddress = String('');
  public transactionAddress = String('');
  public nation = String('');
  public representative = String('');
  public representativePosition = String('');
  public decisionNumber = String('');
  public decisionDate = String('');
  public bank = String('');
  public accountNumber = String('');
  public bankBranch = String('');
  public accountName = String('');
  private _dataValidator: DataValidator = new DataValidator();

  public get dataValidator() {
    return this._dataValidator;
  }

  private isValidCode() {
    const field = 'code';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.code,
      this._dataValidator[field],
      mess_code
    );
  }

  private isValidTaxCode() {
    const field = 'taxCode';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.taxCode,
      this._dataValidator[field],
      mess_taxCode
    );
  }

  private isValidTaxCodePlace() {
    const field = 'taxCodePlace';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.taxCodePlace,
      this._dataValidator[field],
      mess_taxCodePlace
    );
  }

  private isValidTaxCodeDate() {
    const field = 'taxCodeDate';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.taxCodeDate,
      this._dataValidator[field],
      mess_taxCodeDate
    );
  }

  private isValidName() {
    const field = 'name';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.name,
      this._dataValidator[field],
      mess_name
    );
  }

  private isValidAbbreviation() {
    const field = 'abbreviation';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.abbreviation,
      this._dataValidator[field],
      mess_abbreviation
    );
  }

  private isValidRegisterAddress() {
    const field = 'registerAddress';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.registerAddress,
      this._dataValidator[field],
      mess_registerAddress
    );
  }

  private isValidTransactionAddress() {
    const field = 'transactionAddress';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.transactionAddress,
      this._dataValidator[field],
      mess_transactionAddress
    );
  }

  private isValidNation() {
    const field = 'nation';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.nation,
      this._dataValidator[field],
      mess_nation
    );
  }

  private isValidRepresentative() {
    const field = 'representative';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.representative,
      this._dataValidator[field],
      mess_representative
    );
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

  private isValidAccountNumber() {
    const field = 'accountNumber';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.accountNumber,
      this._dataValidator[field],
      mess_accountNumber
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

  public isValidData() {
    return (
      this.isValidCode() &&
      this.isValidTaxCode() &&
      this.isValidTaxCodePlace() &&
      this.isValidTaxCodeDate() &&
      this.isValidName() &&
      this.isValidAbbreviation() &&
      this.isValidRegisterAddress() &&
      this.isValidTransactionAddress() &&
      this.isValidNation() &&
      this.isValidRepresentative() &&
      this.isValidBank() &&
      this.isValidAccountNumber() &&
      this.isValidAccountName()
    );
  }

  public showValidateData(keyString: string) {
    switch (keyString) {
      case 'code':
        return !this.isValidCode();
      case 'taxCode':
        return !this.isValidTaxCode();
      case 'taxCodePlace':
        return !this.isValidTaxCodePlace();
      case 'taxCodeDate':
        return !this.isValidTaxCodeDate();
      case 'name':
        return !this.isValidName();
      case 'abbreviation':
        return !this.isValidAbbreviation();
      case 'registerAddress':
        return !this.isValidRegisterAddress();
      case 'transactionAddress':
        return !this.isValidTransactionAddress();
      case 'nation':
        return !this.isValidNation();
      case 'representative':
        return !this.isValidRepresentative();
      case 'bank':
        return !this.isValidBank();
      case 'accountNumber':
        return !this.isValidAccountNumber();
      case 'accountName':
        return !this.isValidAccountName();
    }
    return false;
  }
}
