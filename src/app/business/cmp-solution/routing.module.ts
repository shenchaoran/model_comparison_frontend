import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmpSolutionListComponent } from './cmp-solution-list/cmp-solution-list.component';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { SiderMenuLayoutComponent, HeaderMenuLayoutComponent } from '@shared';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            { 
                path: '', 
                component: CmpSolutionListComponent 
            },
            {
                path: ':id',
                component: SolutionDetailComponent
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class CmpSolutionListRoutingModule {
}