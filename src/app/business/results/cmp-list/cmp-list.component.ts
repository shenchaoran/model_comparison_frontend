import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TaskService } from '../../services/task.service';
import { DynamicTitleService } from '@core/services/dynamic-title.service';

@Component({
  selector: 'ogms-cmp-list',
  templateUrl: './cmp-list.component.html',
  styleUrls: ['./cmp-list.component.scss']
})
export class CmpListComponent {
    
    constructor(
        public route: ActivatedRoute,
        public service: TaskService,
        public title: DynamicTitleService
    ) { }

    listAdaptor(tasks): any[] {
        // _.map(tasks, task => {
        //     let opt = {
        //         yAxis: {
        //             data: ['init', 'Running', 'Succeed', 'Failed'],
        //             axisLabel: {
        //                 inside: false
        //             }
        //         },
        //         xAxis: {
        //             axisLine: {
        //                 show: false
        //             },
        //             axisTick: {
        //                 show: false
        //             },
        //         },
        //         series: [
        //             {
        //                 type: 'bar',
        //                 itemStyle: {
        //                     normal: { color: 'rgba(0,0,0,0.07)'}
        //                 },
        //                 barGap: '-100%',
        //                 barCategoryGap: '40%',
        //                 data: new Array(4).fill(task.totalCmp),
        //                 animation: false
        //             },
        //             {
        //                 type: 'bar',
        //                 data: [task.initCmp, task.runningCmp, task.succeedCmp, task.failedCmp]
        //             }
        //         ]
        //     }
        //     _.set(task, 'chartOption', 'opt')
        // })
        return tasks
    }
}