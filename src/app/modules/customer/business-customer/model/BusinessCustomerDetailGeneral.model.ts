import { formatDateToAPI } from '@app/shared/function-common';
import { CreateBusinessCustomerModel } from './CreateBusinessCustomer.model';

export class BusinessCustomerDetailGeneralModel extends CreateBusinessCustomerModel {
  public id: number;

  public mapDTO(dto: any) {
    if (dto) {
      this.id = dto.custId;
      this.avatar = dto.com_logo;
      this.taxCode = dto.com_tax_code;
      this.taxCodeDate = dto.com_tax_code_dt
        ? new Date(dto.com_tax_code_dt)
        : undefined;
      this.taxCodePlace = dto.com_tax_code_by;
      this.name = dto.com_name;
      this.abbreviation = dto.com_name_short;
      this.address = dto.com_address;
      this.representative = dto.com_rep_name;
      this.representativePosition = dto.com_rep_position;
    }
  }

  public isValidDataEdit() {
    return this.isValidTaxCode() && this.isValidName();
  }

  public toObjectSendAPIEdit() {
    return {
      custId: this.id,
      com_logo: this.avatar,
      com_tax_code: this.taxCode,
      com_tax_code_dt: this.taxCodeDate
        ? formatDateToAPI(this.taxCodeDate)
        : undefined,
      com_tax_code_by: this.taxCodePlace,
      com_name: this.name,
      com_name_short: this.abbreviation,
      com_address: this.address,
      com_rep_name: this.representative,
      com_rep_position: this.representativePosition,
    };
  }
}
