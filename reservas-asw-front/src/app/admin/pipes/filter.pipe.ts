import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], page: number = 0, itemsPerPage: number = 5): any[] {

    return items.slice( page, page + itemsPerPage );

  }

}
