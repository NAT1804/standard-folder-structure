export class IndividualCustomerDetailGeneralModel {
  public id: number;
  public avatar = String('');
  public code = String('');
  public name = String('');
  public birthday: Date | undefined = undefined;
  public gender = String('');
  public idType = String('');
  public idNo = String('');
  public idImage = String('');
  public referralCode = String('');
  public idDate = String('');
  public idExpiredDate = String('');
  public idPlace = String('');
  public idNationality = String('');
  public idCountry = String('');
  public numberPhone = String('');
  public email = String('');
  public permanentAddress = String('');
  public contactAddress = String('');
  public accountSource = String('');
  public createdUser = String('');
  public createdTime: Date | undefined = undefined;

  public mapDTO(dto: any) {
    if (dto) {
      this.id = dto.custId;
      this.code = dto.cif_no;
      this.name = dto.full_name;
      this.birthday = dto.birthday ? new Date(dto.birthday) : undefined;
      this.gender = dto.sex;
      this.idType = dto.idcard_type;
      this.idNo = dto.idcard_no;
      this.referralCode = dto.referral_cd;
      this.idDate = dto.idcard_issue_dt;
      this.idExpiredDate = dto.idcard_expire_dt;
      this.idPlace = dto.idcard_issue_by;
      this.idNationality = dto.cntry_reg;
      this.idCountry = dto.origin_add;
      this.numberPhone = dto.phone;
      this.email = dto.email;
      this.permanentAddress = dto.res_add;
      this.createdUser = dto.created_by;
      this.createdTime = dto.created ? new Date(dto.created) : undefined;
    }
  }
}
