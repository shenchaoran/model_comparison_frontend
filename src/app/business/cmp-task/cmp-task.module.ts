import { NgModule } from '@angular/core';
import { CmpTaskListComponent } from './cmp-task-list/cmp-task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { CmpTaskListRoutingModule } from './cmp-task-routing.module';
import { SharedModule } from '@shared';
import { NewTaskComponent } from './new-task/new-task.component';
import { CmpTaskService } from './services';
import { EchartsNg2Module } from 'echarts-ng2';
import { HotTableModule } from 'angular-handsontable';
import { CmpResultMapComponent } from './cmp-result-map/cmp-result-map.component';
import { CmpResultTableComponent } from './cmp-result-table/cmp-result-table.component';
import { CmpResultChartComponent } from './cmp-result-chart/cmp-result-chart.component';
import { EchartAdapterService } from '@core/services/echartAdapter.service';
import { CmpSlnService } from "../cmp-solution/services/cmp-sln.service";
import { MSService } from "../models/services/geo-models.service";
import { CmpSharedModule } from '../cmp-shared';
import { CalcuCfgComponent } from '../cmp-shared';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';

const COMPONENTS = [
    CmpTaskListComponent,
    TaskDetailComponent,
    NewTaskComponent,
    CmpResultMapComponent,
    CmpResultTableComponent,
    CmpResultChartComponent,
];
const SERVICES = [
    CmpTaskService,
    EchartAdapterService,
    CmpSlnService,
    MSService,
    NzNotificationService
];


@NgModule({
    imports: [
        SharedModule,
        CmpTaskListRoutingModule,
        EchartsNg2Module,
        HotTableModule,
        CmpSharedModule,
    ],
    declarations: [
        ...COMPONENTS,
    ],
    providers: [
        ...SERVICES,
    ],
    entryComponents: [
        CalcuCfgComponent,
    ],
    exports: [
        ...COMPONENTS
    ]
})
export class CmpTaskModule { }
