import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stringLimit'
})
export class StringLimitPipe implements PipeTransform {

    transform(value: string, rlength: number): string {
        const length = value.length;
        if(rlength === undefined) {
            rlength = 90;
        }

        if(length <= rlength) {
            return value;
        }
        else {
            value = value.substr(0, rlength);
            value = value.substr(0, value.lastIndexOf(' ')) + ' ...';
            return value;
        }
    }

}