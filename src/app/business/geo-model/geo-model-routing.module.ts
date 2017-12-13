import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeoModelComponent } from './geo-model.component';
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
        children: []
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GeoModelRoutingModule {}
