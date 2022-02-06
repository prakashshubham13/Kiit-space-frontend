import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'featured'
})
export class FeaturedPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    return value.filter((item: any) => item.featured === true);
  }

}
