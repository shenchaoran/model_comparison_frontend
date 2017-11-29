import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../common/core/services/auth.guard';
import { DataInquireService } from '../common/core/services/data.inquire.service';

import { SiderMenuLayoutComponent } from '../common/layout/sider-menu-layout/sider-menu-layout.component';
import { HeaderMenuLayoutComponent } from '../common/layout/header-menu-layout/header-menu-layout.component';
import { APP_CONFIG } from '@config/app.config';
import { MENU_LAYOUT } from '@common/layout/layout.enum';

let menuLayout;
switch(APP_CONFIG.layout) {
    case MENU_LAYOUT.HEADER_MENU_LAYOUT:
        menuLayout = HeaderMenuLayoutComponent;
        break;
    case MENU_LAYOUT.SIDER_MENU_LAYOUT:
        menuLayout = SiderMenuLayoutComponent;
        break;
}

const routes: Routes = [
    {
        path: '',
        component: menuLayout,
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
