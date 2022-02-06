import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(posts: any, searchvalue: any): any {
    if (!posts || !searchvalue)
      return posts;
    return posts.filter((item: any) => item.title.toLocaleLowerCase().indexOf(searchvalue.toLocaleLowerCase()) !== -1 || item.tags.includes(searchvalue.toLocaleLowerCase()) || item.creator_name.toLocaleLowerCase().indexOf(searchvalue.toLocaleLowerCase()) !== -1);
  }

}
