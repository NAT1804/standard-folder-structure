import {
  DataValidator,
  Validator,
  ValidatorItem,
} from '@app/data/model/validation';

export const mess_smsName = 'Vui lòng nhập Tên đăng nhập';
export const mess_smsPassword = 'Vui lòng nhập Mật khẩu';
export const mess_smsBrandName = 'Vui lòng nhập Brand name';
export const mess_serverAddress = 'Vui lòng nhập Địa chỉ máy chủ';
export const mess_serverPort = 'Vui lòng nhập Cổng máy chủ';
export const mess_serverEmail = 'Vui lòng nhập Email gửi đi';
export const mess_serverName = 'Vui lòng nhập Tên đăng nhập';
export const mess_serverPassword = 'Vui lòng nhập Mật khẩu';
export const mess_serverBrandName = 'Vui lòng nhập Brand name';
export const mess_title = 'Vui lòng nhập Tiêu đề thông báo app';

export class SettingSendNotiModel {
  public id: number | undefined;
  // Thông tin cấu hình SMS
  public smsName = String('');
  public smsPassword = String('');
  public smsBrandName = String('');
  // Thông tin cấu hình email
  public serverAddress = String('');
  public serverPort = String('');
  public serverEmail = String('');
  public serverName = String('');
  public serverPassword = String('');
  public serverBrandName = String('');
  // Thông tin tiêu đề thông báo trên APP
  public title = String('');

  private _dataValidator: DataValidator = new DataValidator();

  public get dataValidator() {
    return this._dataValidator;
  }

  private isValidSmsName() {
    const field = 'smsName';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.smsName,
      this._dataValidator[field],
      mess_smsName
    );
  }

  private isValidSmsPassword() {
    const field = 'smsPassword';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.smsPassword,
      this._dataValidator[field],
      mess_smsPassword
    );
  }

  private isValidSmsBrandName() {
    const field = 'smsBrandName';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.smsBrandName,
      this._dataValidator[field],
      mess_smsBrandName
    );
  }

  private isValidServerAddress() {
    const field = 'serverAddress';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.serverAddress,
      this._dataValidator[field],
      mess_serverAddress
    );
  }

  private isValidServerPort() {
    const field = 'serverPort';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.serverPort,
      this._dataValidator[field],
      mess_serverPort
    );
  }

  private isValidServerEmail() {
    const field = 'serverEmail';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.serverEmail,
      this._dataValidator[field],
      mess_serverEmail
    );
  }

  private isValidServerName() {
    const field = 'serverName';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.serverName,
      this._dataValidator[field],
      mess_serverName
    );
  }

  private isValidServerPassword() {
    const field = 'serverPassword';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.serverPassword,
      this._dataValidator[field],
      mess_serverPassword
    );
  }

  private isValidServerBrandName() {
    const field = 'serverBrandName';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.serverBrandName,
      this._dataValidator[field],
      mess_serverBrandName
    );
  }

  private isValidTitle() {
    const field = 'title';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.title,
      this._dataValidator[field],
      mess_title
    );
  }

  public isValidData() {
    return (
      this.isValidSmsName() &&
      this.isValidSmsPassword() &&
      this.isValidSmsBrandName() &&
      this.isValidServerAddress() &&
      this.isValidServerPort() &&
      this.isValidServerEmail() &&
      this.isValidServerName() &&
      this.isValidServerPassword() &&
      this.isValidServerBrandName() &&
      this.isValidTitle()
    );
  }

  public showValidateData(keyString: string) {
    switch (keyString) {
      case 'smsName':
        return !this.isValidSmsName();
      case 'smsPassword':
        return !this.isValidSmsPassword();
      case 'smsBrandName':
        return !this.isValidSmsBrandName();
      case 'serverAddress':
        return !this.isValidServerAddress();
      case 'serverPort':
        return !this.isValidServerPort();
      case 'serverEmail':
        return !this.isValidServerEmail();
      case 'serverName':
        return !this.isValidServerName();
      case 'serverPassword':
        return !this.isValidServerPassword();
      case 'serverBrandName':
        return !this.isValidServerBrandName();
      case 'title':
        return !this.isValidTitle();
    }
    return false;
  }
}
