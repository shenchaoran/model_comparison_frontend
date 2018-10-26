import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    // TODO 待优化 mark as check
    pure: false
})
export class ArrayFilterPipe implements PipeTransform {

    transform(items: any[], filter: number): any[] {
        return _.filter(items, filter);
    }

}