import { Component, OnInit } from '@angular/core';
import * as uuidv1 from 'uuid/v1';

import { VisualType } from './visualType.enum';
import { HotRegisterer } from 'angular-handsontable';
import { DataListService } from '../main-window/services/data-list.service';
import { ErrorHandle } from '../../common/core/base/error-handle';
import { NzNotificationService } from 'ng-zorro-antd';
import { UDXType } from '../main-window/component/property-panel/UDX-type.enum';
import { EchartAdapterService } from '../../common/core/services/echartAdapter.service';

@Component({
    selector: 'app-visualization',
    templateUrl: './visualization.component.html',
    styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent extends ErrorHandle implements OnInit {
    visualType: VisualType = null;

    // hot table setting
    showDiagramModal: boolean = false;
    hotTableIsLoading: boolean = true;
    hotTableInstance = null;
    hotTableSettings: object = {
        afterLoadData: firstLoad => {
            if (!firstLoad) {
                this.hotTableIsLoading = false;
            }
        }
    };
    hotTableColumns: Array<{
        data: string;
        title: string;
        type?: string;
    }> = null;
    hotTableData: Array<any> = null;
    hotContextMenu = null;

    // e-chart setting
    // 在manager->visualization中统计
    selectedChartId: string = null;
    eChartOptions: any = {};



    // e-chart modal cfg
    selectedChartType = null;
    chartTypeOptions = [
        {
            value: 'line',
            label: 'Lines'
        },
        {
            value: 'bar',
            label: 'Bars'
        },
        {
            value: 'pie',
            label: 'Pies'
        },
        {
            value: 'radar',
            label: 'Radars'
        },
        {
            value: 'scatter',
            label: 'Scatters'
        }
    ];
    _xAxisOptions = null;
    selectedXAxis = null;
    _yAxisOptions = null;
    selectedyAxis = null;
    _canSubmit = false;

    // map setting
    // 在manager->visualization中统计
    selectedMapId: string = null;
    mapOptions: any = {};

    constructor(
        private hotRegisterer: HotRegisterer,
        private dataListService: DataListService,
        private _notification: NzNotificationService,
        private echartAdapterService: EchartAdapterService
    ) {
        super();
        const self = this;

        this.hotContextMenu = {
            items: {
                copy: {},
                chart: {
                    name: 'chart',
                    // TODO 必须点一下才显示modal
                    callback: function(key, options) {
                        // console.log(key, options);
                        // const hot = self.hotRegisterer.getInstance(
                        //     self.hotTableInstance
                        // );
                        // const range = hot.getSelected();
                        // console.log(hot.getData(range[0], range[1], range[2], range[3]));
                        self.showDiagramModal = true;
                        return true;
                    }
                }
            }
        };
    }

    ngOnInit() {
        postal
            .channel('DATA_CHANNEL')
            .subscribe('data.show', (data, envelope) => {
                this.dataListService
                    .showUDX(data.gdid)
                    .toPromise()
                    .then(response => {
                        if (
                            _.startsWith(_.get(response, 'status.code'), '200')
                        ) {
                            // this._notification.info(
                            //     'Info:',
                            //     'Visualization UDX succeed!'
                            // );

                            const resData = response.data;
                            if (resData.type === UDXType.TABLE) {
                                this.visualType = VisualType.Table;

                                this.hotTableColumns = resData.parsed.columns;
                                this.hotTableData = resData.parsed.data;

                                this.hotTableInstance = data.gdid;
                                this.hotTableIsLoading = false;


                                this._xAxisOptions = _.map(this.hotTableColumns, col => {
                                    return {
                                        value: col.title,
                                        label: col.title
                                    };
                                });
                                this._yAxisOptions = _.map(this.hotTableColumns, col => {
                                    return {
                                        value: col.title,
                                        label: col.title,
                                        checked: false
                                    };
                                });
                            } else {
                            }
                        } else {
                            this._notification.warning(
                                'Warning:',
                                'Visualization UDX failed!'
                            );
                        }
                    })
                    .catch(this.handleError);
            });
    }

    checkChartCfg() {
        if(this.selectedChartType == null || this.selectedXAxis == null) {
            this._canSubmit = false;
            return ;
        }
        const chartType = this.selectedChartType.value;
        const xAxis = this.selectedXAxis.value;
        const yAxises = _
                            .chain(this._yAxisOptions)
                            .filter('checked')
                            .map(option => option.value)
                            .value();
        if(chartType != null && xAxis!= null && yAxises.length != 0) {
            this._canSubmit = true;
        }
        else {
            this._canSubmit = false;
        }
    }

    submitDiagramModal(e) {
        const hot = this.hotRegisterer.getInstance(
            this.hotTableInstance
        );
        const xColI = _
                        .chain(this.hotTableColumns)
                        .findIndex((col) => col.title === this.selectedXAxis.value)
                        .value();
        const xAxisData = hot.getDataAtCol(xColI);
        let yColHeaders = [];
        const yColIs = _
                        .chain(this._yAxisOptions)
                        .filter('checked')
                        .map(option => {
                            const colHeader = option.value;
                            yColHeaders.push(colHeader);
                            return _
                                    .chain(this.hotTableColumns)
                                    .findIndex((col) => col.title === colHeader)
                                    .value();
                        })
                        .value();
        const yAxisDatas = _.map(yColIs, yColI => hot.getDataAtCol(yColI));
        const coreOption = this.echartAdapterService.multiSeries2DAdapter(xAxisData, yAxisDatas, yColHeaders);
        const option = this.echartAdapterService.multiSeries2DAssembler(coreOption, this.selectedChartType.value);
        
        const length = xAxisData.length;
        const percent = 10000/length;

        (<any>option).dataZoom = [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                end: percent
            },
            {
                type: 'slider',
                show: true,
                yAxisIndex: [0],
                left: '93%',
            },
            {
                type: 'inside',
                xAxisIndex: [0],
                end: percent
            },
            {
                type: 'inside',
                yAxisIndex: [0]
            }
        ]

        const guid = uuidv1();
        this.eChartOptions[guid] = option;
        this.selectedChartId = guid;
        this.visualType = 2;
        postal
            .channel('VISUALIZATION')
            .publish('diagram.add', option);

        this.showDiagramModal = false;
    }

    cancelDiagramModal(e) {
        this.showDiagramModal = false;
    }
}
