import { Pipe, PipeTransform } from '@angular/core';
import { layoutPaths } from '../theme.constants';

@Pipe({ name: 'baImgPath' })
export class BaImgPathPipe implements PipeTransform {

  transform(input: string): string {
    return layoutPaths.images.root + input;
  }
}