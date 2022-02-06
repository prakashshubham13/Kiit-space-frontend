import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'private'
})
export class PrivatePipe implements PipeTransform {

  transform(posts: any): any {
    return posts.filter((item: any) => item.private === false);
  }

}
