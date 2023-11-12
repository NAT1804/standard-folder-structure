import {
  DataValidator,
  Validator,
  ValidatorItem,
} from '@app/data/model/validation';
import { formatDateToAPI } from '@app/shared/function-common';

export const mess_code = 'Vui lòng nhập Mã tư vấn viên';
export const mess_name = 'Vui lòng nhập Họ và tên';
export const mess_phone = 'Vui lòng nhập Số điện thoại';
export const mess_organization = 'Vui lòng nhập Phòng ban';
export const mess_date = 'Vui lòng chọn Ngày bắt đầu tư vấn';

export class CrudIndiCusDetailSaleModel {
  public id: string | undefined = undefined;
  public customerId = String('');
  public code = String('');
  public name = String('');
  public phone = String('');
  public organization = String('');
  public date: Date | undefined = undefined;
  protected _dataValidator: DataValidator = new DataValidator();

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

  private isValidPhone() {
    const field = 'phone';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.phone,
      this._dataValidator[field],
      mess_phone
    );
  }

  private isValidOrganization() {
    const field = 'organization';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.organization,
      this._dataValidator[field],
      mess_organization
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

  public showValidateData(keyString: string) {
    switch (keyString) {
      case 'code':
        return !this.isValidCode();
      case 'name':
        return !this.isValidName();
      case 'phone':
        return !this.isValidPhone();
      case 'organization':
        return !this.isValidOrganization();
      case 'date':
        return !this.isValidDate();
    }
    return false;
  }

  public isValidData() {
    return (
      this.isValidCode() &&
      this.isValidName() &&
      this.isValidPhone() &&
      this.isValidOrganization() &&
      this.isValidDate()
    );
  }

  public toObjectSendToAPI() {
    return {
      id: this.id,
      custId: this.customerId,
      saler_code: this.code,
      saler_name: this.name,
      saler_phone: this.phone,
      saler_department: this.organization,
      start_date: this.date ? formatDateToAPI(this.date) : undefined,
    };
  }

  public mapDTO(dto: any) {
    if (dto) {
      this.id = dto.id;
      this.code = dto.saler_code;
      this.name = dto.saler_name;
      this.phone = dto.saler_phone;
      this.organization = dto.saler_department;
      this.date = dto.start_date ? new Date(dto.start_date) : undefined;
    }
  }
}
