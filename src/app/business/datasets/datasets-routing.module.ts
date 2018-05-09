import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeoDataComponent} from './geo-data/geo-data.component';
import { HeaderMenuLayoutComponent } from '@shared';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: GeoDataComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatasetsRoutingModule { }
