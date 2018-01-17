import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSharedModule } from '@ngx-shared';
import { AsciiGridComponent } from './ascii-grid/ascii-grid.component';

import { OlMapService } from '@feature/ol-map/ol-map.module.ts';

@NgModule({
    imports: [NgxSharedModule],
    declarations: [AsciiGridComponent],
    exports: [AsciiGridComponent],
    providers: [OlMapService]
})
export class VisualizationModule {}
