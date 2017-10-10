import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateStrFormat' })
export class DateStrFormatPipe implements PipeTransform {
    transform(dateStr: string): string {
        if (dateStr) {
          let group = dateStr.match(/(\d{4}(\/|\-)\d{1,2}(\/|\-)\d{1,2})/);
          if(group && group.length){
            return group[0];
          }
          else{
            return '';
          }
        }
        else{
            return '';
        }
    }
}
