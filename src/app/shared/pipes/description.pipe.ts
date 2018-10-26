import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'description'
})
export class DescriptionPipe implements PipeTransform {

    transform(value: string): string {
        if (value) {
            return value
        }
        else {
            return 'No description';
        }
    }

}