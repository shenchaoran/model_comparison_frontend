import { Pipe, PipeTransform } from '@angular/core';
import { ResourceSrc } from '@models';

@Pipe({ name: 'resourceSrc' })
export class ResourceSrcPipe implements PipeTransform {
    transform(src: number): string {
        if (src) {
          if(ResourceSrc[src]) {
            return _.chain(ResourceSrc[src]).lowerCase().upperFirst().value();
          }
          else {
              return '-';
          }
        }
        else{
            return '-';
        }
    }
}
