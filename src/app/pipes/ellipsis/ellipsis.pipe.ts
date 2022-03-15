import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis',
})
export class EllipsisPipe implements PipeTransform {
  transform(value: string | number, ...args: unknown[]): unknown {
    //Needed to convert number to string
    value = value + '';
    return value.length <= 20 ? value : value.substring(0, 20) + '...';
  }
}
