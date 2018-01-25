import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'undefined' })
export class UndefinedPipe implements PipeTransform {
    transform(value: string, type: string): string {
            return value? value: '-';
    }
}
