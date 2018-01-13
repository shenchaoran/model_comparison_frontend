import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeoDataComponent } from './geo-data.component';
import { DataProcessorComponent } from './data-processor/data-processor.component';
import { StdDataSetComponent } from './std-data-set/std-data-set.component';

const routes: Routes = [
    { 
        path: '', 
        component: GeoDataComponent,
        children: [
            { 
                path: 'std-data-set',
                component: StdDataSetComponent,
                data: {
                    showMenu: false
                }
            },
            { 
                path: 'data-processor',
                component: DataProcessorComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GeoDataRoutingModule {}
