import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@ngx-shared';
import { SharedModule } from '@shared';

import { OlMapRoutingModule } from './ol-map-routing.module';
import { OlMapComponent } from './ol-map.component';
import { LayerTreeComponent } from './layer-tree/layer-tree.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LegendComponent } from './legend/legend.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
    imports: [NgxSharedModule, SharedModule, OlMapRoutingModule],
    declarations: [
        OlMapComponent,
        LayerTreeComponent,
        ToolbarComponent,
        LegendComponent,
        LayoutComponent
    ]
})
export class OlMapModule {}
