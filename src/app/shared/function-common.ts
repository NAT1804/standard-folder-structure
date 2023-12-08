import { DropdownDTO, IDropdown } from '@app/data/interfaces/interface';
import moment from 'moment';
import {
  COMPARE_TYPE,
  ETypeFormatDate,
  STATUS_RESPONSE,
} from './constants/app.const';

export function compareDate(firstDate: Date, secondDate: Date, type: number) {
  if (
    firstDate &&
    firstDate instanceof Date &&
    secondDate &&
    secondDate instanceof Date
  ) {
    const firstDateTime = firstDate.getTime();
    const secondDateTime = secondDate.getTime();
    switch (type) {
      case COMPARE_TYPE.EQUAL:
        return firstDateTime === secondDateTime;
      case COMPARE_TYPE.GREATER:
        return firstDateTime > secondDateTime;
      case COMPARE_TYPE.LESS:
        return firstDateTime < secondDateTime;
      case COMPARE_TYPE.GREATER_EQUAL:
        return firstDateTime >= secondDateTime;
      case COMPARE_TYPE.LESS_EQUAL:
        return firstDateTime <= secondDateTime;
    }
  }
  return null;
}

export function scrollToError() {
  const elements = document.getElementsByClassName('ng-invalid');
  if (elements && elements.length) {
    elements[0].scrollIntoView({ behavior: 'smooth' });
  }
}

export function formatDateToAPI(datetime: Date | string) {
  return moment(new Date(datetime)).format('YYYY-MM-DDTHH:mm:ss');
}

export function formatDate(value: Date | string, type: ETypeFormatDate) {
  return moment(value).isValid() && value ? moment(value).format(type) : '';
}

export function mapDropdownDTOToIDropdown(
  dtos: DropdownDTO[],
  isConvertToLowerCase = Boolean(false)
) {
  const result: IDropdown[] = dtos.map(
    (item: DropdownDTO) =>
      ({
        value:
          typeof item.value === 'string'
            ? isConvertToLowerCase
              ? item.value.toLowerCase()
              : item.value
            : item.value,
        label: item.name,
      }) as IDropdown
  );
  return result;
}

export function compareValueToString(value1: any, value2: any) {
  return value1 + '' === value2 + '';
}

export function compareValueToUpperCase(value1: any, value2: any) {
  return (value1 + '').toUpperCase() === (value2 + '').toUpperCase();
}

export function handleResponse(
  response: any,
  toastService?: any,
  message?: string
): boolean {
  if (response) {
    if (response?.status === STATUS_RESPONSE.SUCCESS) {
      if (message) toastService.showToastSucess(message);
      return true;
    } else {
      let message = '';
      if (response?.message) {
        message = response?.message;
      } else {
        message = 'Có lỗi xảy ra vui lòng thử lại sau!';
      }
      toastService.showToastError(message);
      return false;
    }
  }
  return false;
}
