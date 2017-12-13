import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComparisonComponent } from './comparison.component';
import { CmpTaskComponent } from './cmp-task/cmp-task.component';
import { CmpSolutionComponent } from './cmp-solution/cmp-solution.component';
import { CmpSceneComponent } from './cmp-scene/cmp-scene.component';
import { NewSolutionComponent } from './new-solution/new-solution.component';
import { CmpSlnService, CmpTaskService, CmpSceneService } from './services';
import { MSService } from '../geo-model/services';

const routes: Routes = [
    { 
        path: '',
        component: ComparisonComponent,
        children: [
            {
                path: '',
                redirectTo: 'solutions',
                pathMatch: 'full'
            },
            {
                path: 'solutions',
                component: CmpSolutionComponent,
                children: [],
                resolve: {
                    solutionTabTree: CmpSlnService
                }
            },
            {
                path: 'solutions/new',
                component: NewSolutionComponent,
                resolve: {
                    geoModelTree: MSService
                }
            },
            {
                path: 'tasks',
                component: CmpTaskComponent,
                resolve: {
                    taskTabTree: CmpTaskService
                }
            },
            {
                path: 'scenes',
                component: CmpSceneComponent,
                resolve: {
                    sceneTabTree: CmpSceneService
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CmpRoutingModule {}
