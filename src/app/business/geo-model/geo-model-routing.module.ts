import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeoModelComponent } from './geo-model.component';
// import { ModelTreeComponent } from './model-tree/model-tree.component';

const routes: Routes = [
    {
        path: '',
        component: GeoModelComponent,
        children: []
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GeoModelRoutingModule {}
