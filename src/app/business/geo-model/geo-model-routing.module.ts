import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeoModelComponent } from './geo-model.component';
import { ModelsComponent } from './models/models.component';
import { ModelInfoComponent } from './model-info/model-info.component';
import { SiderMenuLayoutComponent, HeaderMenuLayoutComponent } from '@shared';
import { MSService } from './services';
// import { ModelTreeComponent } from './model-tree/model-tree.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: GeoModelComponent,
                resolve: {
                    geoModelTree: MSService
                },
                children: [
                    {
                        path: '',
                        component: ModelsComponent,
                        data: {
                            title: 'Models'
                        }
                    },
                    {
                        path: ':id',
                        component: ModelInfoComponent
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
export class GeoModelRoutingModule {}
