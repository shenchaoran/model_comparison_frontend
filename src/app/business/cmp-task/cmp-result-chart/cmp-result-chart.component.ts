// TODO 数据量大，后端制图

import { Component, OnInit, Input, Output, Inject, AfterViewInit } from '@angular/core';
import { CmpTaskService } from '../services/cmp-task.service';

@Component({
    selector: 'ogms-cmp-result-chart',
    templateUrl: './cmp-result-chart.component.html',
    styleUrls: ['./cmp-result-chart.component.scss']
})
export class CmpResultChartComponent implements OnInit, AfterViewInit {
    options: any;

    @Input() type: "swipe" | "default" = "default";
    @Input() source: {
        path: string,
        state: number
    };


    constructor(
        @Inject('BACKEND') private backend,
        private cmpTaskService: CmpTaskService
    ) { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        if (this.source && this.source.path) {
            setTimeout(() => {
                this.cmpTaskService.getTable(this.source.path)
                    .subscribe(response => {
                        const rows = _
                            .chain(response)
                            .split('\n')
                            .map(row => {
                                if(row.trim() !== '') {
                                    return row.split(',');
                                }
                            })
                            .filter(item => item !== undefined)
                            .value();
                        // 转置 table body
                        const ths = (_.remove(rows, (row, i) => i === 0))[0];
                        // const units = _.remove(rows, (row, i) => i === 0);
                        const transed = [];
                        for (let i = 0; i < rows.length; i++) {
                            for (let j = 0; j < rows[i].length; j++) {
                                if (transed.length <= j) {
                                    transed.push([]);
                                }
                                transed[j].push(parseFloat(rows[i][j]));
                            }
                        }
                        const xData = [];
                        for(let i=0; i< rows.length; i++) {
                            xData.push(i);
                        }
                        const series = _.map(transed, (row, i) => {
                            return {
                                name: ths[i],
                                data: row,
                                type: 'line'
                            };
                        });

                        this.options = {
                            legend: {
                                data: ths
                            },
                            xAxis: {
                                type: 'category',
                                data: xData
                            },
                            yAxis: {
                                type: 'value'
                            },
                            dataZoom: [
                                {
                                    show: true,
                                    start: 0,
                                    end: 10
                                }
                            ],
                            series: series
                        };
                    })
            }, 0);
        }

    }
}
