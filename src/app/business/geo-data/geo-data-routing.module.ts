import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeoDataComponent } from './geo-data.component';

const routes: Routes = [
    { 
        path: '', 
        component: GeoDataComponent,
        children: []
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GeoDataRoutingModule {}
