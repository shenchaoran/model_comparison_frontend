import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmpDetailComponent } from './cmp-detail/cmp-detail.component';
import { CmpListComponent } from './cmp-list/cmp-list.component';
import { HeaderMenuLayoutComponent } from '@shared';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: CmpListComponent,
                data: {
                    title: 'Results & Diagnostics'
                }
            },
            {
                path: ':id',
                component: CmpDetailComponent,
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
export class ResultsRoutingModule { }
