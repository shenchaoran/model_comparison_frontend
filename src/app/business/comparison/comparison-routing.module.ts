import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComparisonComponent } from './comparison.component';
import { CmpExampleComponent } from './cmp-example/cmp-example.component';
import { CmpSolutionComponent } from './cmp-solution/cmp-solution.component';
import { StartCmpComponent } from './start-cmp/start-cmp.component';

const routes: Routes = [
    { 
        path: '',
        component: ComparisonComponent,
        children: [
            {
                path: 'cmp-solution',
                component: CmpSolutionComponent
            },
            {
                path: 'cmp-example',
                component: CmpExampleComponent
            },
            {
                path: 'start-cmp',
                component: StartCmpComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CmpRoutingModule {}
