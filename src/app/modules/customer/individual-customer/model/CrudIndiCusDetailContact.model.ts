import {
  DataValidator,
  Validator,
  ValidatorItem,
} from '@app/data/model/validation';

export const mess_contactAddress = 'Vui lòng nhập Tên địa chỉ liên hệ';

export class CrudIndiCusDetailContactModel {
  public id: string | undefined = undefined;
  public customerId = String('');
  public contactAddress = String('');
  public isDefault = Boolean(false);
  protected _dataValidator: DataValidator = new DataValidator();

  public get dataValidator() {
    return this._dataValidator;
  }

  private isValidContactAddress() {
    const field = 'contactAddress';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.contactAddress,
      this._dataValidator[field],
      mess_contactAddress
    );
  }

  public showValidateData(keyString: string) {
    switch (keyString) {
      case 'contactAddress':
        return !this.isValidContactAddress();
    }
    return false;
  }

  public isValidData() {
    return this.isValidContactAddress();
  }

  public toObjectSendToAPI() {
    return {
      id: this.id,
      custId: this.customerId,
      contact_address: this.contactAddress,
      is_default: !this.isDefault,
    };
  }

  public mapDTO(dto: any) {
    if (dto) {
      this.id = dto.id;
      this.contactAddress = dto.contact_address;
      this.isDefault = !!dto.is_default;
    }
  }
}
