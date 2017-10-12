import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainWindowComponent } from './main-window.component';
import { ModelToolService } from './services/model-tool.service';
import { DataToolService } from './services/data-tool.service';

const routes: Routes = [
    {
        path: '',
        component: MainWindowComponent,
        resolve: {
            modelTools: ModelToolService,
            dataTools: DataToolService
        },
        children: [
            {
                path: '',
                loadChildren: '../../common/feature/map/map.module#MapModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainWindowRoutingRoutes {}
