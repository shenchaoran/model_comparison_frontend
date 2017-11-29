import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../common/core/services/auth.guard';
import { DataInquireService } from '../common/core/services/data.inquire.service';

import { SiderMenuLayoutComponent, HeaderMenuLayoutComponent } from '@common/layout';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                loadChildren: './home/home.module#HomeModule'
            },
            {
                path: 'geo-model',
                loadChildren: './geo-model/geo-model.module#GeoModelModule'
            },
            {
                path: 'geo-data',
                loadChildren: './geo-data/geo-data.module#GeoDataModule'
            },
            {
                path: 'comparison',
                loadChildren: './comparison/comparison.module#ComparisonModule'
            },
            {
                path: 'help',
                loadChildren: './help/help.module#HelpModule'
            },
            {
                path: 'v1.0',
                loadChildren: './main-window/main-window.module#MainWindowModule'
            },
            {
                path: ':username',
                loadChildren: './profile/profile.module#ProfileModule'
            },
            {
                path: '**',
                redirectTo: 'home'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WebNJGISRoutingModule {}
