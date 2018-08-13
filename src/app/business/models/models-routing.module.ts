import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderMenuLayoutComponent, DocDetailTemplateComponent } from '@shared';
import { GeoModelListComponent } from './geo-model-list/geo-model-list.component';
import { GeoModelDetailComponent } from './geo-model-detail/geo-model-detail.component';
import { MSService } from './services/geo-models.service';
import { InvokeComponent } from './invoke/invoke.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: GeoModelListComponent,
                // resolve: {
                //     geoModelTree: MSService
                // },
                data: {
                    title: 'Model Resource'
                },
            },
            {
                path: ':id',
                component: DocDetailTemplateComponent,
                children: [
                    {
                        path: '',
                        component: GeoModelDetailComponent,
                        data: {
                            title: 'Model Resource'
                        }
                    }
                ]
            },
            {
                path: ':id/invoke',
                component: InvokeComponent,
                data: {
                    title: 'Model Invoke'
                }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelsRoutingModule { }
