import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@shared';
import { ArrayFilterPipe } from './array-filter.pipe';
import { CoordinatePipe } from './coordinate.pipe';
import { DescriptionPipe } from './description.pipe';
import { MomentDatePipe } from './moment-date.pipe';
import { ResourceSrcPipe } from './resource-src.pipe';
import { StringLimitPipe } from './string-limit.pipe';
import { UndefinedPipe } from './undefined.pipe';

const pipes = [
    MomentDatePipe,
    ResourceSrcPipe,
    UndefinedPipe,
    StringLimitPipe,
    ArrayFilterPipe,
    DescriptionPipe,
    CoordinatePipe,
];

@NgModule({
  imports: [
    NgxSharedModule,
  ],
  declarations: [...pipes],
  exports: [...pipes]
})
export class PipesModule { }