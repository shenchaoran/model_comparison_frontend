import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MethodDetailComponent } from './method-detail/method-detail.component';
import { MethodListComponent } from './method-list/method-list.component';
import { HeaderMenuLayoutComponent } from '@shared';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: MethodListComponent,
                data: {
                    title: 'Comparison Methods'
                }
            },
            {
                path: ':id',
                component: MethodDetailComponent,
                data: {
                    title: 'Comporison Method'
                }
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmpMethodsRoutingModule { }
