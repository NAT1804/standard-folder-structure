import {
  DataValidator,
  Validator,
  ValidatorItem,
} from '@app/data/model/validation';

export const mess_fileName = 'Vui lòng nhập Tên file';
export const mess_fileSrc = 'Vui lòng chọn File';

export class CrudBusiCusDetailFileModel {
  public id: string | undefined = undefined;
  public customerId = String('');
  public fileName = String('');
  public fileSrc = String('');
  private _dataValidator: DataValidator = new DataValidator();

  public get dataValidator() {
    return this._dataValidator;
  }

  private isValidFileName() {
    const field = 'fileName';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.fileName,
      this._dataValidator[field],
      mess_fileName
    );
  }

  private isValidFileSrc() {
    const field = 'fileSrc';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.fileSrc,
      this._dataValidator[field],
      mess_fileSrc
    );
  }

  public showValidateData(keyString: string) {
    switch (keyString) {
      case 'fileName':
        return !this.isValidFileName();
      case 'fileSrc':
        return !this.isValidFileSrc();
    }
    return false;
  }

  public isValidData() {
    return this.isValidFileName() && this.isValidFileSrc();
  }

  public mapDTO(dto: any) {
    if (dto) {
      this.id = dto.id;
      this.fileName = dto.meta_name;
      this.fileSrc = dto.meta_url;
    }
  }

  public toObjectSendToAPI() {
    return {
      id: this.id,
      custId: this.customerId,
      meta_name: this.fileName,
      meta_url: this.fileSrc,
    };
  }
}
