import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeoDataComponent } from './geo-data.component';
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
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GeoDataRoutingModule {}
