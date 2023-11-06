import { COMPARE_TYPE } from './constants/app.const';

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
