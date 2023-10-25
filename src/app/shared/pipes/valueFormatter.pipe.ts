import { Pipe, PipeTransform } from '@angular/core';
import { IValueFormatter } from '@app/data/interfaces/interface';

@Pipe({
  name: 'valueFormatter',
})
export class ValueFormatterPipe implements PipeTransform {
  // value: cell, valueFormatter: func format
  transform(value: any, valueFormatter: (...params: any[]) => string): string {
    if (valueFormatter && typeof valueFormatter === 'function') {
      return valueFormatter({
        data: value,
      } as IValueFormatter);
    }
    return value;
  }
}
