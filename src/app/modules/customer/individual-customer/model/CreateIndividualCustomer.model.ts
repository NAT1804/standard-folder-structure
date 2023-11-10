import {
  DataValidator,
  Validator,
  ValidatorItem,
} from '@app/data/model/validation';
import { IndividualCustomerConst } from '../service/individual-customer.const';
import { formatDateToAPI } from '@app/shared/function-common';

export const mess_typeOfDocument = 'Vui lòng chọn Loại giấy tờ';
export const mess_frontImage = 'Vui lòng chọn Ảnh mặt trước';
export const mess_backImage = 'Vui lòng chọn Ảnh mặt sau';
export const mess_idNo = 'Vui lòng nhập Mã giấy tờ';
export const mess_fullname = 'Vui lòng nhập Họ và tên';
export const mess_gender = 'Vui lòng chọn Giới tính';
export const mess_birthday = 'Vui lòng chọn Ngày sinh';
export const mess_nation = 'Vui lòng nhập Quốc tịch';
export const mess_country = 'Vui lòng nhập Nguyên quán';
export const mess_permanentAddress = 'Vui lòng nhập Địa chỉ thường trú';
export const mess_taxCodeDate = 'Vui lòng chọn Ngày cấp';
export const mess_expiredDate = 'Vui lòng chọn Ngày hết hạn';
export const mess_taxCodePlace = 'Vui lòng nhập Nơi cấp';
export const mess_bank = 'Vui lòng nhập Ngân hàng';
export const mess_accountNumber = 'Vui lòng nhập Số tài khoản';
export const mess_accountOwner = 'Vui lòng nhập Chủ tài khoản';
export const mess_numberPhone = 'Vui lòng nhập Số điện thoại';
export const mess_password = 'Vui lòng nhập Mật khẩu';

export class CreateIndividualCustomerModel {
  public typeOfDocument: number | undefined = undefined;
  public frontImage = String('');
  public backImage = String('');
  public idNo = String('');
  public fullname = String('');
  public gender: boolean | undefined = undefined;
  public birthday: Date | undefined = undefined;
  public nation = String('');
  public country = String('');
  public permanentAddress = String('');
  public taxCodeDate: Date | undefined = undefined;
  public expiredDate: Date | undefined = undefined;
  public taxCodePlace = String('');
  public signatureImage = String('');
  public referralCode = String('');
  public referralUser = String('');
  public bank = String('');
  public accountNumber = String('');
  public accountOwner = String('');
  public numberPhone = String('');
  public email = String('');
  public password = String('');
  protected _dataValidator: DataValidator = new DataValidator();

  public get dataValidator() {
    return this._dataValidator;
  }

  protected isValidTypeOfDocument() {
    const field = 'typeOfDocument';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueNumber(
      this.typeOfDocument,
      this._dataValidator[field],
      mess_typeOfDocument
    );
  }

  protected isValidFrontImage() {
    const field = 'frontImage';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.frontImage,
      this._dataValidator[field],
      mess_frontImage
    );
  }

  protected isValidBackImage() {
    const field = 'backImage';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.backImage,
      this._dataValidator[field],
      mess_backImage
    );
  }

  protected isValidIdNo() {
    const field = 'idNo';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.idNo,
      this._dataValidator[field],
      mess_idNo
    );
  }

  protected isValidFullname() {
    const field = 'fullname';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.fullname,
      this._dataValidator[field],
      mess_fullname
    );
  }

  protected isValidGender() {
    const field = 'gender';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueBoolean(
      this.gender,
      this._dataValidator[field],
      mess_gender
    );
  }

  protected isValidBirthday() {
    const field = 'birthday';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueDate(
      this.birthday,
      this._dataValidator[field],
      mess_birthday
    );
  }

  protected isValidNation() {
    const field = 'nation';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.nation,
      this._dataValidator[field],
      mess_nation
    );
  }

  protected isValidCountry() {
    const field = 'country';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.country,
      this._dataValidator[field],
      mess_country
    );
  }

  protected isValidPermanentAddress() {
    const field = 'permanentAddress';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.permanentAddress,
      this._dataValidator[field],
      mess_permanentAddress
    );
  }

  protected isValidTaxCodeDate() {
    const field = 'taxCodeDate';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueDate(
      this.taxCodeDate,
      this._dataValidator[field],
      mess_taxCodeDate
    );
  }

  protected isValidExpiredDate() {
    const field = 'expiredDate';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueDate(
      this.expiredDate,
      this._dataValidator[field],
      mess_expiredDate
    );
  }

  protected isValidTaxCodePlace() {
    const field = 'taxCodePlace';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.taxCodePlace,
      this._dataValidator[field],
      mess_taxCodePlace
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

  protected isValidAccountOwner() {
    const field = 'accountOwner';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.accountOwner,
      this._dataValidator[field],
      mess_accountOwner
    );
  }

  protected isValidNumberPhone() {
    const field = 'numberPhone';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.numberPhone,
      this._dataValidator[field],
      mess_numberPhone
    );
  }

  protected isValidPassword() {
    const field = 'password';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.password,
      this._dataValidator[field],
      mess_password
    );
  }

  public isValidData() {
    return (
      // this.isValidTypeOfDocument() &&
      this.isValidFrontImage() &&
      this.isValidBackImage() &&
      this.isValidIdNo() &&
      this.isValidFullname() &&
      this.isValidGender() &&
      this.isValidBirthday() &&
      this.isValidNation() &&
      this.isValidCountry() &&
      this.isValidPermanentAddress() &&
      this.isValidTaxCodeDate() &&
      this.isValidExpiredDate() &&
      this.isValidTaxCodePlace() &&
      this.isValidBank() &&
      this.isValidAccountNumber() &&
      this.isValidAccountOwner() &&
      this.isValidNumberPhone() &&
      this.isValidPassword()
    );
  }

  public showValidateData(keyString: string) {
    switch (keyString) {
      case 'typeOfDocument':
        return !this.isValidTypeOfDocument();
      case 'frontImage':
        return !this.isValidFrontImage();
      case 'backImage':
        return !this.isValidBackImage();
      case 'idNo':
        return !this.isValidIdNo();
      case 'fullname':
        return !this.isValidFullname();
      case 'gender':
        return !this.isValidGender();
      case 'birthday':
        return !this.isValidBirthday();
      case 'nation':
        return !this.isValidNation();
      case 'country':
        return !this.isValidCountry();
      case 'permanentAddress':
        return !this.isValidPermanentAddress();
      case 'taxCodeDate':
        return !this.isValidTaxCodeDate();
      case 'expiredDate':
        return !this.isValidExpiredDate();
      case 'taxCodePlace':
        return !this.isValidTaxCodePlace();
      case 'bank':
        return !this.isValidBank();
      case 'accountNumber':
        return !this.isValidAccountNumber();
      case 'accountOwner':
        return !this.isValidAccountOwner();
      case 'numberPhone':
        return !this.isValidNumberPhone();
      case 'password':
        return !this.isValidPassword();
    }
    return false;
  }

  public toObjectSendToAPI() {
    return {
      cust_type: IndividualCustomerConst.TYPE_INDIVIDUAL_CUSTOMER,
      custId: undefined,
      cif_no: this.idNo,
      full_name: this.fullname,
      // sex: !!(this.gender === IndividualCustomerConst.NAM),
      birthday: this.birthday ? formatDateToAPI(this.birthday) : undefined,
      cntry_reg: this.nation,
      origin_add: this.country,
      res_add: this.permanentAddress,
      idcard_issue_dt: this.taxCodeDate
        ? formatDateToAPI(this.taxCodeDate)
        : undefined,
      idcard_expire_dt: this.expiredDate
        ? formatDateToAPI(this.expiredDate)
        : undefined,
      idcard_issue_plc: this.taxCodePlace,
      bank_name: this.bank,
      bank_acc_no: this.accountNumber,
      bank_acc_name: this.accountOwner,
    };
  }
}
