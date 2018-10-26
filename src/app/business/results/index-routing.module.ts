import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmpDetailComponent } from './cmp-detail/cmp-detail.component';
import { CmpListComponent } from './cmp-list/cmp-list.component';
import { CalcuDetailComponent } from './calcu-detail/calcu-detail.component';
import { CalcuListComponent } from './calcu-list/calcu-list.component';
import { HeaderMenuLayoutComponent } from '@shared';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'calculation'
            },
            {
                path: 'calculation',
                component: CalcuListComponent,
                data: {
                    title: 'Results & Diagnostics'
                }
            },
            {
                path: 'calculation/:id',
                component: CalcuDetailComponent,
                data: {
                    title: 'Results & Diagnostics'
                }
            },
            {
                path: 'comparison',
                component: CmpListComponent,
                data: {
                    title: 'Results & Diagnostics'
                }
            },
            {
                path: 'comparison/:id',
                component: CmpDetailComponent,
                data: {
                    title: 'Results & Diagnostics'
                }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
