import {
  DataValidator,
  Validator,
  ValidatorItem,
} from '@app/data/model/validation';

export const mess_page = 'Vui lòng chọn Trang hình ảnh';
export const mess_position = 'Vui lòng chọn Vị trí hình ảnh';
export const mess_title = 'Vui lòng nhập Tiêu đề';
export const mess_shortContent = 'Vui lòng nhập Nội dung tóm tắt';
export const mess_content = 'Vui lòng nhập Nội dung chính';
export const mess_image = 'Vui lòng chọn Hình ảnh';
export class CreateOrEditMediaImageModel {
  public id: string | undefined = undefined;
  public page = String('');
  public position = String('');
  public outstanding = String('');
  public title = String('');
  public shortContent = String('');
  public content = String('');
  public image = String('');
  public isRedirect = Boolean(false);
  public redirectType = String('');
  public redirectLevel1 = String('');
  public redirectLevel2 = String('');
  public redirectLink = String('');

  private _dataValidator: DataValidator = new DataValidator();

  public get dataValidator() {
    return this._dataValidator;
  }

  private isValidPage() {
    const field = 'page';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.page,
      this._dataValidator[field],
      mess_page
    );
  }

  private isValidPosition() {
    const field = 'position';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.position,
      this._dataValidator[field],
      mess_position
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

  private isValidShortContent() {
    const field = 'shortContent';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.shortContent,
      this._dataValidator[field],
      mess_shortContent
    );
  }

  private isValidContent() {
    const field = 'content';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.content,
      this._dataValidator[field],
      mess_content
    );
  }

  private isValidImage() {
    const field = 'image';
    !this._dataValidator[field] &&
      (this._dataValidator[field] = new ValidatorItem());
    return Validator.funcValidValueString(
      this.image,
      this._dataValidator[field],
      mess_image
    );
  }

  public isValidData() {
    return (
      this.isValidPage() &&
      this.isValidPosition() &&
      this.isValidTitle() &&
      this.isValidShortContent() &&
      this.isValidContent() &&
      this.isValidImage()
    );
  }

  public showValidateData(keyString: string) {
    switch (keyString) {
      case 'page':
        return !this.isValidPage();
      case 'position':
        return !this.isValidPosition();
      case 'title':
        return !this.isValidTitle();
      case 'shortContent':
        return !this.isValidShortContent();
      case 'content':
        return !this.isValidContent();
      case 'image':
        return !this.isValidImage();
    }
    return false;
  }

  public toObjectSendToAPI() {
    return {
      id: this.id,
      appPageId: this.page,
      appPositionId: this.position,
      priorityOutstandingId: this.outstanding,
      title: this.title,
      summary_content: this.shortContent,
      main_image: this.image,
      main_content: this.content,
      is_direct: this.isRedirect,
      direct_type: this.redirectType,
      direct_lv1: this.redirectLevel1,
      direct_lv2: this.redirectLevel2,
      direct_link: this.redirectLink,
    };
  }

  public mapDTO(dto: any) {
    if (dto) {
      this.id = dto.id;
      this.page = dto.appPageId;
      this.position = dto.appPositionId;
      this.outstanding = dto.priorityOutstandingId;
      this.title = dto.title;
      this.shortContent = dto.summary_content;
      this.content = dto.main_content;
      this.image = dto.main_image;
      this.isRedirect = !!dto.is_direct;
      this.redirectType = this.isRedirect ? dto.direct_type + '' : '';
      this.redirectLevel1 = dto.direct_lv1;
      this.redirectLevel2 = dto.direct_lv2;
      this.redirectLink = dto.direct_link;
    }
  }
}
