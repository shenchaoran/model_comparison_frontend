import { Component, OnInit, ViewChild } from '@angular/core';
import * as uuidv1 from 'uuid/v1';

import { VisualType } from './visualType.enum';
import { HotRegisterer } from 'angular-handsontable';
import { DataListService } from '../main-window/services/data-list.service';
import { ErrorHandle } from '../../common/core/base/error-handle';
import { NzNotificationService } from 'ng-zorro-antd';
import { UDXType } from '../main-window/component/property-panel/UDX-type.enum';
import { EchartAdapterService } from '../../common/core/services/echartAdapter.service';
import { NJTable } from './table-cfg.class';
import { NJMap, NJLayer } from './map-cfg.class';
import { NJDiagram } from './diagram-cfg.class';

@Component({
    selector: 'app-visualization',
    templateUrl: './visualization.component.html',
    styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent extends ErrorHandle implements OnInit {
    @ViewChild('echarts') echarts: any;
    visualType: VisualType = null;

    // table setting
    njTable: NJTable = new NJTable();

    // diagram setting
    // 在manager->visualization中统计
    njDiagramList: Array<NJDiagram> = [];
    selectedDiagramId: string = null;
    selectedDiagramOpt: any = null;

    // diagram modal cfg
    showDiagramModal: boolean = false;
    selectedDiagramType = null;
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

        this.njTable.hotTableCfg.contextMenu = {
            items: {
                copy: {},
                chart: {
                    name: 'chart',
                    // TODO 必须点一下才显示modal
                    callback: function(key, options) {
                        // console.log(key, options);
                        // const hot = self.hotRegisterer.getInstance(
                        //     self.njTable.hotTableCfg.instance
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

                                this.njTable.geodata = data;
                                this.njTable.hotTableCfg.cols =
                                    resData.parsed.columns;
                                this.njTable.hotTableCfg.data =
                                    resData.parsed.data;

                                this.njTable.hotTableCfg.instance = data.gdid;
                                this.njTable.hotTableCfg.loading = false;

                                this._xAxisOptions = _.map(
                                    this.njTable.hotTableCfg.cols,
                                    col => {
                                        return {
                                            value: col.title,
                                            label: col.title
                                        };
                                    }
                                );
                                this._yAxisOptions = _.map(
                                    this.njTable.hotTableCfg.cols,
                                    col => {
                                        return {
                                            value: col.title,
                                            label: col.title,
                                            checked: false
                                        };
                                    }
                                );
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

        postal
            .channel('LAYOUT_CHANNEL')
            .subscribe('propertity-panel.hide', (data, envelope) => {
                this.onResize(null);
            });

        postal
            .channel('LAYOUT_CHANNEL')
            .subscribe('propertity-panel.data.show', (data, envelope) => {
                this.onResize(null);
            });

        postal
            .channel('LAYOUT_CHANNEL')
            .subscribe('propertity-panel.model.show', (data, envelope) => {
                this.onResize(null);
            });

        postal
            .channel('VISUALIZATION')
            .subscribe('diagram.show', (data, envelope) => {
                this.visualType = VisualType.Diagram;
                this.selectedDiagramId = data;
            });

        postal
            .channel('VISUALIZATION')
            .subscribe('diagram.close', (data, envelope) => {
                if (data === this.selectedDiagramId) {
                    this.selectedDiagramId = null;
                    this.selectedDiagramOpt = null;
                }
                _.remove(this.njDiagramList, diagram => {
                    return diagram.guid === data;
                });
            });

        postal
            .channel('VISUALIZATION')
            .subscribe('map.show', (data, envelope) => {});

        postal
            .channel('VISUALIZATION')
            .subscribe('map.close', (data, envelope) => {});

        postal
            .channel('VISUALIZATION')
            .subscribe('layer.close', (data, envelope) => {});

        postal
            .channel('VISUALIZATION')
            .subscribe('map.closeAll', (data, envelope) => {});

        postal
            .channel('VISUALIZATION')
            .subscribe('diagram.closeAll', (data, envelope) => {
                this.selectedDiagramId = null;
                this.njDiagramList = [];
            });
    }

    checkChartCfg() {
        if (this.selectedDiagramType == null || this.selectedXAxis == null) {
            this._canSubmit = false;
            return;
        }
        const chartType = this.selectedDiagramType.value;
        const xAxis = this.selectedXAxis.value;
        const yAxises = _.chain(this._yAxisOptions)
            .filter('checked')
            .map(option => option.value)
            .value();
        if (chartType != null && xAxis != null && yAxises.length != 0) {
            this._canSubmit = true;
        } else {
            this._canSubmit = false;
        }
    }

    submitDiagramModal(e) {
        let njDiagram = new NJDiagram();
        njDiagram.geodata = this.njTable.geodata;
        const hot = this.hotRegisterer.getInstance(
            this.njTable.hotTableCfg.instance
        );
        const xColI = _.chain(this.njTable.hotTableCfg.cols)
            .findIndex(col => col.title === this.selectedXAxis.value)
            .value();
        const xAxisData = hot.getDataAtCol(xColI);
        let yColHeaders = [];
        const yColIs = _.chain(this._yAxisOptions)
            .filter('checked')
            .map(option => {
                const colHeader = option.value;
                yColHeaders.push(colHeader);
                return _.chain(this.njTable.hotTableCfg.cols)
                    .findIndex(col => col.title === colHeader)
                    .value();
            })
            .value();
        const yAxisDatas = _.map(yColIs, yColI => hot.getDataAtCol(yColI));
        const coreOption = this.echartAdapterService.multiSeries2DAdapter(
            xAxisData,
            yAxisDatas,
            yColHeaders
        );
        const option = this.echartAdapterService.multiSeries2DAssembler(
            coreOption,
            this.selectedDiagramType.value
        );

        const length = xAxisData.length;
        const percent = 10000 / length;

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
                left: '93%'
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
        ];

        const guid = uuidv1();
        this.selectedDiagramId = guid;
        this.selectedDiagramOpt = option;
        this.visualType = 2;
        njDiagram.guid = guid;
        njDiagram.option = option;
        this.njDiagramList.push(njDiagram);
        postal.channel('VISUALIZATION').publish('diagram.add', {
            guid: guid,
            label: this.njTable.geodata.filename
        });

        this.showDiagramModal = false;
    }

    cancelDiagramModal(e) {
        this.showDiagramModal = false;
    }

    onResize(e) {
        // TODO size control
        if(this.echarts) {
            this.echarts.resize();
        }
    }
}
