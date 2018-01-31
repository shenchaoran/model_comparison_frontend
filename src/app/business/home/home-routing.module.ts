import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    SiderMenuLayoutComponent,
    HeaderMenuLayoutComponent
} from '@shared';

import { HomeComponent } from './home.component';

const routes: Routes = [
    { 
        path: '', 
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            }
        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule {}
