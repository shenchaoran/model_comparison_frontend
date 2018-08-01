import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderMenuLayoutComponent } from '@shared';
import { DatasetsComponent } from './datasets/datasets.component';
// import { IbisStdDataComponent } from './ibis-std-data/ibis-std-data.component';
// import { BiomeStdDataComponent } from './biome-std-data/biome-std-data.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: DatasetsComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatasetsRoutingModule { }
