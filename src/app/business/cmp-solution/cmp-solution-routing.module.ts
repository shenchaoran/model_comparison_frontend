import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmpSolutionListComponent } from './cmp-solution-list/cmp-solution-list.component';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { HeaderMenuLayoutComponent } from '@shared';
import { NewSlnComponent } from './new-sln/new-sln.component';
import { CmpSlnService } from './services';
import { CmpSolutionComponent } from './cmp-solution.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: CmpSolutionComponent,
                children: [
                    { 
                        path: '', 
                        component: CmpSolutionListComponent,
                        resolve: {
                            solutions: CmpSlnService
                        },
                        data: {
                            title: 'Comparison Solutions'
                        }
                    },
                    {
                        path: 'new',
                        component: NewSlnComponent,
                        data: {
                            title: 'Create a New Solution'
                        }
                    },
                    {
                        path: ':id',
                        component: SolutionDetailComponent
                    },
                    {
                        path: '**',
                        redirectTo: '',
                        pathMatch: 'full'
                    }
                ]
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