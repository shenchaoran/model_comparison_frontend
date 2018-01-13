import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeoDataComponent } from './geo-data.component';
import { DataService } from './services/data.service';

const routes: Routes = [
    { 
        path: '', 
        component: GeoDataComponent,
        resolve: {
            geoDataResource: DataService
        },
        children: []
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GeoDataRoutingModule {}
