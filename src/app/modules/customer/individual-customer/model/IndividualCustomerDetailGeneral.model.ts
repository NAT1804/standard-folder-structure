import { formatDateToAPI } from '@app/shared/function-common';
import { CreateIndividualCustomerModel } from './CreateIndividualCustomer.model';

export class IndividualCustomerDetailGeneralModel extends CreateIndividualCustomerModel {
  public id: number;
  public avatar = String('');
  public code = String('');
  public idImage = String('');
  public contactAddress = String('');
  public accountSource = String('');
  public createdUser = String('');
  public createdTime: Date | undefined = undefined;

  public mapDTO(dto: any) {
    if (dto) {
      this.id = dto.custId;
      this.avatar = dto.avatar_url;
      this.frontImage = dto.idcard_font_url;
      this.backImage = dto.idcard_back_url;
      this.code = dto.cif_no;
      this.fullname = dto.full_name;
      this.birthday = dto.birthday ? new Date(dto.birthday) : undefined;
      this.gender = dto.sex;
      this.typeOfDocument = dto.idcard_type;
      this.idNo = dto.idcard_no;
      this.referralCode = dto.referral_cd;
      this.taxCodeDate = dto.idcard_issue_dt
        ? new Date(dto.idcard_issue_dt)
        : undefined;
      this.expiredDate = dto.idcard_expire_dt
        ? new Date(dto.idcard_expire_dt)
        : undefined;
      this.taxCodePlace = dto.idcard_issue_by;
      this.nation = dto.cntry_reg;
      this.country = dto.origin_add;
      this.numberPhone = dto.phone;
      this.email = dto.email;
      this.permanentAddress = dto.res_add;
      this.contactAddress = dto.contact_address;
      this.accountSource = dto.cust_source;
      this.createdUser = dto.created_by;
      this.createdTime = dto.created ? new Date(dto.created) : undefined;
    }
  }

  public isValidDataEdit() {
    return (
      this.isValidFrontImage() &&
      this.isValidBackImage() &&
      this.isValidFullname() &&
      this.isValidBirthday() &&
      this.isValidGender() &&
      this.isValidTypeOfDocument() &&
      this.isValidIdNo() &&
      this.isValidTaxCodeDate() &&
      this.isValidExpiredDate() &&
      this.isValidTaxCodePlace() &&
      this.isValidNation() &&
      this.isValidCountry() &&
      this.isValidNumberPhone() &&
      this.isValidPermanentAddress()
    );
  }

  public toObjectSendAPIEdit() {
    return {
      custId: this.id,
      avatar_url: this.avatar,
      idcard_font_url: this.frontImage,
      idcard_back_url: this.backImage,
      full_name: this.fullname,
      birthday: this.birthday ? formatDateToAPI(this.birthday) : undefined,
      sex: !!this.gender,
      idcard_type: this.typeOfDocument,
      idcard_no: this.idNo,
      referral_cd: this.referralCode,
      idcard_issue_dt: this.taxCodeDate
        ? formatDateToAPI(this.taxCodeDate)
        : undefined,
      idcard_expire_dt: this.expiredDate
        ? formatDateToAPI(this.expiredDate)
        : undefined,
      idcard_issue_by: this.taxCodePlace,
      cntry_reg: this.nation,
      origin_add: this.country,
      phone: this.numberPhone,
      email: this.email,
      res_add: this.permanentAddress,
      contact_address: this.contactAddress,
    };
  }
}
