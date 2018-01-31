import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComparisonComponent } from './comparison.component';
import { CmpTaskComponent } from './cmp-task/cmp-task.component';
import { CmpSolutionComponent } from './cmp-solution/cmp-solution.component';
import { CmpSceneComponent } from './cmp-scene/cmp-scene.component';
import { NewSolutionComponent } from './new-solution/new-solution.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { CmpSlnService, CmpTaskService, CmpSceneService } from './services';
import { MSService } from '../geo-model/services';
import { DataService } from '../geo-data/services';
import { CmpResultsComponent } from './cmp-results/cmp-results.component';
import { ShowCmpSolutionComponent } from "./show-cmp-solution/show-cmp-solution.component";
import { ShowCmpSolutioninfoComponent } from "./show-cmp-solutioninfo/show-cmp-solutioninfo.component";
import { CmpTaskListComponent } from './cmp-task-list/cmp-task-list.component';

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
                component: ShowCmpSolutionComponent,
                children: [],
                resolve: {
                    solutionTabTree: CmpSlnService
                }
            },
            {
                path: 'solutioninfo',
                component: ShowCmpSolutioninfoComponent
            },
            {
                path: 'solutions/new',
                component: NewSolutionComponent
            },
            {
                path: 'tasks',
                component: CmpTaskListComponent,
                resolve: {
                    // taskTabTree: CmpTaskService
                    tasks: CmpTaskService
                }
            },
            {
                path: 'tasks/new',
                component: NewTaskComponent,
                resolve: {
                    geoDataResource: DataService,
                    geoModelTree: MSService
                },
                children: []
            },
            {
                path: 'tasks/:id',
                component: CmpResultsComponent
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
