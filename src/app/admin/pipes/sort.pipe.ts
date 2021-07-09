import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(items: any[], orderProp: string): any[] {
    return items.sort((a, b) => (a[orderProp] > b[orderProp]) ? 1 : -1);
  }

}
