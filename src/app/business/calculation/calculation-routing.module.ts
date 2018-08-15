import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderMenuLayoutComponent } from '@common/shared';
import { CalcuListComponent } from './calcu-list/calcu-list.component';
import { CalcuDetailComponent } from './calcu-detail/calcu-detail.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: CalcuListComponent
            },
            {
                path: ':id',
                component: CalcuDetailComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CalculationRoutingModule {
}