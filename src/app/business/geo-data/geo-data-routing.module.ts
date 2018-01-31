import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeoDataComponent } from './geo-data.component';
import { DataService } from './services/data.service';
import { DatasComponent } from "./datas/datas.component";
import { DataInfoComponent } from "./data-info/data-info.component";
import { SiderMenuLayoutComponent, HeaderMenuLayoutComponent } from '@shared';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            { 
                path: '', 
                component: GeoDataComponent,
                resolve: {
                    geoDataResource: DataService
                },
                children: [
                    {
                        path: '',
                        component: DatasComponent
                    },
                    {
                        path: 'datainfo',
                        component: DataInfoComponent
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GeoDataRoutingModule {}
