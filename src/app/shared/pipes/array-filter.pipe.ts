import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'lodash';

@Pipe({
    name: 'filter',
    // TODO 待优化 mark as check
    pure: false
})
export class ArrayFilterPipe implements PipeTransform {

    transform(items: any[], filterStr): any[] {
        return filter(items, filterStr);
    }

}