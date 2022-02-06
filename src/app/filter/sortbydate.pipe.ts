import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortbydate'
})
export class SortbydatePipe implements PipeTransform {

  transform(value: any): any {
    return value.sort((a: any, b: any) => -a.date.localeCompare(b.date));
  }

}
