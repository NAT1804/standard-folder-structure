import {
  DataValidator,
  Validator,
  ValidatorItem,
} from '@app/data/model/validation';
import { formatDateToAPI } from '@app/shared/function-common';

export const mess_typeOfDocument = 'Vui lòng chọn Loại giấy tờ';
export const mess_code = 'Vui lòng nhập Mã giấy tờ';
export const mess_date = 'Vui lòng chọn Ngày cấp';
export const mess_expiredDate = 'Vui lòng chọn Ngày hết hạn';
export const mess_frontImage = 'Vui lòng chọn Ảnh mặt trước';
export const mess_backImage = 'Vui lòng chọn Ảnh mặt sau';

export class CrudIndiCusDetailVerifyModel {
  public id: string | undefined = undefined;
  public customerId = String('');
  public typeOfDocument: number | undefined = undefined;
  public code = String('');
  public date: Date | undefined = undefined;
  public expiredDate: Date | undefined = undefined;
  public frontImage = String('');
  public backImage = String('');
  public isDefault = Boolean(false);
  protected _dataValidator: DataValidator = new DataValidator();

  public get dataValidator() {
    return this._dataValidator;
  }

  private isValidTypeOfDocument() {
    const field = 'typeOfDocument';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueNumber(
      this.typeOfDocument,
      this._dataValidator[field],
      mess_typeOfDocument
    );
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

  private isValidDate() {
    const field = 'date';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueDate(
      this.date,
      this._dataValidator[field],
      mess_date
    );
  }

  private isValidExpiredDate() {
    const field = 'expiredDate';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueDate(
      this.expiredDate,
      this._dataValidator[field],
      mess_expiredDate
    );
  }

  private isValidFrontImage() {
    const field = 'frontImage';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.frontImage,
      this._dataValidator[field],
      mess_frontImage
    );
  }

  private isValidBackImage() {
    const field = 'backImage';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.backImage,
      this._dataValidator[field],
      mess_backImage
    );
  }

  public showValidateData(keyString: string) {
    switch (keyString) {
      case 'typeOfDocument':
        return !this.isValidTypeOfDocument();
      case 'code':
        return !this.isValidCode();
      case 'date':
        return !this.isValidDate();
      case 'expiredDate':
        return !this.isValidExpiredDate();
      //   case 'frontImage':
      //     return !this.isValidFrontImage();
      //   case 'backImage':
      //     return !this.isValidBackImage();
    }
    return false;
  }

  public isValidData() {
    return (
      this.isValidTypeOfDocument() &&
      this.isValidCode() &&
      this.isValidDate() &&
      this.isValidExpiredDate()
    );
  }

  public toObjectSendToAPI() {
    return {
      id: this.id,
      custId: this.customerId,
      idcard_type: this.typeOfDocument,
      idcard_no: this.code,
      idcard_issue_dt: this.date ? formatDateToAPI(this.date) : undefined,
      idcard_expire_dt: this.expiredDate
        ? formatDateToAPI(this.expiredDate)
        : undefined,
      idcard_font_url: this.frontImage,
      idcard_back_url: this.backImage,
      is_default: !!this.isDefault,
    };
  }

  public mapDTO(dto: any) {
    if (dto) {
      this.id = dto.id;
      this.typeOfDocument = dto.idcard_type;
      this.code = dto.idcard_no;
      this.date = dto.idcard_issue_dt
        ? new Date(dto.idcard_issue_dt)
        : undefined;
      this.expiredDate = dto.idcard_expire_dt
        ? new Date(dto.idcard_expire_dt)
        : undefined;
      this.frontImage = dto.idcard_font_url;
      this.backImage = dto.idcard_back_url;
      this.isDefault = !!dto.is_default;
    }
  }
}
