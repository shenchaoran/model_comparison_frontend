import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'string' })
export class StringPipe implements PipeTransform {
    transform(value: string, type: string): string {
        if(type === 'undefined') {
            return value? value: '-';
        }
        else {
            return value;
        }
    }
}
