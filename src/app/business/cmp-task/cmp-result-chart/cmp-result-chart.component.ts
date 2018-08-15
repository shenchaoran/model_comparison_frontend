// TODO 数据量大，后端制图

import { Component, OnInit, Input, Output, Inject, AfterViewInit } from '@angular/core';
import { CmpTaskService } from '../services/cmp-task.service';
import { EchartAdapterService } from '@common/core/services/echartAdapter.service';

@Component({
    selector: 'ogms-cmp-result-chart',
    templateUrl: './cmp-result-chart.component.html',
    styleUrls: ['./cmp-result-chart.component.scss']
})
export class CmpResultChartComponent implements OnInit, AfterViewInit {
    options: any;

    @Input() source: {
        seriesData: any,
        seriesName: any
    };


    constructor(
        private cmpTaskService: CmpTaskService,
        private service: EchartAdapterService
    ) { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.source && this.source.seriesData && this.source.seriesName) {
                const coreOpt = this.service.multiSeries2DAdapter(undefined, this.source.seriesData, this.source.seriesName);
                this.options = this.service.multiSeries2DAssembler(coreOpt, 'line', true);
            }
        }, 0);

    }
}
