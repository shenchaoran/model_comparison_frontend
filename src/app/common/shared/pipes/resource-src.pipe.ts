import { Pipe, PipeTransform } from '@angular/core';
import { ResourceSrc } from '@models';

@Pipe({ name: 'resourceSrc' })
export class ResourceSrcPipe implements PipeTransform {
    transform(src: number): string {
        if (src) {
          if(ResourceSrc[src]) {
            return ResourceSrc[src];
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
