import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizationComponent } from './visualization.component';

const routes: Routes = [
    {
        path: '',
        component: VisualizationComponent,
        children: [
            {
                path: '',
                //   loadChildren: '../../common/feature/map/map.module#MapModule'
                loadChildren: '../../common/feature/ol-map/ol-map.module#OlMapModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VisualizationRoutes {}
