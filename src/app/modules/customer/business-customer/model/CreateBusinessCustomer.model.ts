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
  public taxCodeDate = String('');
  public timesChange = Number('');
  public dateChange = String('');
  public name = String('');
  public abbreviation = String('');
  public authorizedCapital = Number('');
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
  public decisionNumber = Number('');
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
    const validRequired = Validator.isEmplty(this.code);
    if (!this._dataValidator[field])
      this._dataValidator[field] = new ValidatorItem();
    if (validRequired) {
      this._dataValidator[field].addMess(mess_code);
    } else {
      this._dataValidator[field].removeMess(mess_code);
    }
    return !validRequired;
  }

  private isValidTaxCode() {
    const field = 'taxCode';
    const validRequired = Validator.isEmplty(this.taxCode);
    if (!this._dataValidator[field])
      this._dataValidator[field] = new ValidatorItem();
    if (validRequired) {
      this._dataValidator[field].addMess(mess_taxCode);
    } else {
      this._dataValidator[field].removeMess(mess_taxCode);
    }
    return !validRequired;
  }

  private isValidTaxCodePlace() {
    const field = 'taxCodePlace';
    const validRequired = Validator.isEmplty(this.taxCodePlace);
    if (!this._dataValidator[field])
      this._dataValidator[field] = new ValidatorItem();
    if (validRequired) {
      this._dataValidator[field].addMess(mess_taxCodePlace);
    } else {
      this._dataValidator[field].removeMess(mess_taxCodePlace);
    }
    return !validRequired;
  }

  private isValidTaxCodeDate() {
    const field = 'taxCodeDate';
    const validRequired = Validator.isEmplty(this.taxCodeDate);
    if (!this._dataValidator[field])
      this._dataValidator[field] = new ValidatorItem();
    if (validRequired) {
      this._dataValidator[field].addMess(mess_taxCodeDate);
    } else {
      this._dataValidator[field].removeMess(mess_taxCodeDate);
    }
    return !validRequired;
  }

  private isValidName() {
    const field = 'name';
    const validRequired = Validator.isEmplty(this.name);
    if (!this._dataValidator[field])
      this._dataValidator[field] = new ValidatorItem();
    if (validRequired) {
      this._dataValidator[field].addMess(mess_name);
    } else {
      this._dataValidator[field].removeMess(mess_name);
    }
    return !validRequired;
  }

  private isValidAbbreviation() {
    const field = 'abbreviation';
    const validRequired = Validator.isEmplty(this.abbreviation);
    if (!this._dataValidator[field])
      this._dataValidator[field] = new ValidatorItem();
    if (validRequired) {
      this._dataValidator[field].addMess(mess_abbreviation);
    } else {
      this._dataValidator[field].removeMess(mess_abbreviation);
    }
    return !validRequired;
  }

  private isValidRegisterAddress() {
    const field = 'registerAddress';
    const validRequired = Validator.isEmplty(this.registerAddress);
    if (!this._dataValidator[field])
      this._dataValidator[field] = new ValidatorItem();
    if (validRequired) {
      this._dataValidator[field].addMess(mess_registerAddress);
    } else {
      this._dataValidator[field].removeMess(mess_registerAddress);
    }
    return !validRequired;
  }

  private isValidTransactionAddress() {
    const field = 'transactionAddress';
    const validRequired = Validator.isEmplty(this.transactionAddress);
    if (!this._dataValidator[field])
      this._dataValidator[field] = new ValidatorItem();
    if (validRequired) {
      this._dataValidator[field].addMess(mess_transactionAddress);
    } else {
      this._dataValidator[field].removeMess(mess_transactionAddress);
    }
    return !validRequired;
  }

  private isValidNation() {
    const field = 'nation';
    const validRequired = Validator.isEmplty(this.nation);
    if (!this._dataValidator[field])
      this._dataValidator[field] = new ValidatorItem();
    if (validRequired) {
      this._dataValidator[field].addMess(mess_nation);
    } else {
      this._dataValidator[field].removeMess(mess_nation);
    }
    return !validRequired;
  }

  private isValidRepresentative() {
    const field = 'representative';
    const validRequired = Validator.isEmplty(this.representative);
    if (!this._dataValidator[field])
      this._dataValidator[field] = new ValidatorItem();
    if (validRequired) {
      this._dataValidator[field].addMess(mess_representative);
    } else {
      this._dataValidator[field].removeMess(mess_representative);
    }
    return !validRequired;
  }

  private isValidBank() {
    const field = 'bank';
    const validRequired = Validator.isEmplty(this.bank);
    if (!this._dataValidator[field])
      this._dataValidator[field] = new ValidatorItem();
    if (validRequired) {
      this._dataValidator[field].addMess(mess_bank);
    } else {
      this._dataValidator[field].removeMess(mess_bank);
    }
    return !validRequired;
  }

  private isValidAccountNumber() {
    const field = 'accountNumber';
    const validRequired = Validator.isEmplty(this.accountNumber);
    if (!this._dataValidator[field])
      this._dataValidator[field] = new ValidatorItem();
    if (validRequired) {
      this._dataValidator[field].addMess(mess_accountNumber);
    } else {
      this._dataValidator[field].removeMess(mess_accountNumber);
    }
    return !validRequired;
  }

  private isValidAccountName() {
    const field = 'accountName';
    const validRequired = Validator.isEmplty(this.accountName);
    if (!this._dataValidator[field])
      this._dataValidator[field] = new ValidatorItem();
    if (validRequired) {
      this._dataValidator[field].addMess(mess_accountName);
    } else {
      this._dataValidator[field].removeMess(mess_accountName);
    }
    return !validRequired;
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
