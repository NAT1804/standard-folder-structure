import { formatDateToAPI } from '@app/shared/function-common';
import { CreateIndividualCustomerModel } from './CreateIndividualCustomer.model';
import { IndividualCustomerConst } from '../service/individual-customer.const';

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
      cust_type: IndividualCustomerConst.TYPE_INDIVIDUAL_CUSTOMER,
      custId: this.id,
      cif_no: this.idNo,
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
      idcard_issue_plc: this.taxCodePlace,
      cntry_reg: this.nation,
      origin_add: this.country,
      phone: this.numberPhone,
      email: this.email,
      res_add: this.permanentAddress,
    };
  }
}
