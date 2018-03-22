import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'coordinate',
    pure: false
})
export class CoordinatePipe implements PipeTransform {

    transform(items: string[] | string): string {
        if(typeof items === 'string') {
            const match = items.match(/\s*\[?\s*(\d+\.?(\d+)?)\s*,\s*(\d+\.?(\d+)?)\s*\]?\s*/);
            if(match.length === 5) {
                return '[' + match[1] + ', ' + match[3] + ']';
            }
            else {
                return 'invalid coordinate';
            }
        }
        else if(typeof items === 'object') {
            if(items.length === 2) {
                return '[' + items.join(', ') + ']';
            }
            else {
                return 'invalid coordinate';
            }
        }
    }

}