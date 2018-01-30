import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeoModelComponent } from './geo-model.component';
import { ModelsComponent } from "./models/models.component";
import { ModelInfoComponent } from "./model-info/model-info.component";
import {
    MSService
} from './services';
// import { ModelTreeComponent } from './model-tree/model-tree.component';

const routes: Routes = [
    {
        path: '',
        component: GeoModelComponent,
        resolve: {
            geoModelTree: MSService
        },
        children: [
            {
                path: '',
                redirectTo: 'models',
                pathMatch: 'full'
            },
            {
                path: 'models',
                component: ModelsComponent,
            },
            {
                path: 'modelinfo',
                component: ModelInfoComponent
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GeoModelRoutingModule {}
