import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderMenuLayoutComponent } from '@shared';
import { CalcuDetailComponent } from './calcu-detail/calcu-detail.component';
import { CalcuListComponent } from './calcu-list/calcu-list.component';

const routes: Routes = [
    
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: CalcuListComponent,
                data: {
                    title: 'Results & Diagnostics'
                }
            },
            {
                path: ':id',
                component: CalcuDetailComponent,
                data: {
                    title: 'Results & Diagnostics'
                }
            },
        ]
    }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculationRoutingModule { }
