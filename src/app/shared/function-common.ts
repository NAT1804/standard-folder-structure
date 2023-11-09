import moment from 'moment';
import { COMPARE_TYPE, ETypeFormatDate } from './constants/app.const';
import { DropdownDTO, IDropdown } from '@app/data/interfaces/interface';

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

export function scrollToErorr() {
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

export function mapDropdownDTOToIDropdown(dtos: DropdownDTO[]) {
  const result: IDropdown[] = dtos.map(
    (item: DropdownDTO) =>
      ({
        value: item.value,
        label: item.name,
      }) as IDropdown
  );
  return result;
}
