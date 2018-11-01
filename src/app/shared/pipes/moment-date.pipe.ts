import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({ name: 'moment' })
export class MomentDatePipe implements PipeTransform {
    transform(value: Date, formatString: string): string {
        if (value) {
            return format(value, formatString);
        } else {
            return '';
        }
    }
}
