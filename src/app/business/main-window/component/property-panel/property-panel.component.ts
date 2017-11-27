import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { HotRegisterer } from 'angular-handsontable';
import * as uuidv1 from 'uuid/v1';

import { ModelToolService } from '../../services/model-tool.service';
import { GeoData } from '../data-list/geo-data';
import { ModelInput } from './modelInput';
import { PropertyPanelShowType } from './property-panel-show-type';
import { UDXType } from '../../models/UDX.type.model';
import { NJDiagram } from '../../../visualization/diagram-cfg.class';
import { EchartAdapterService } from '../../../../common/core/services/echartAdapter.service';

@Component({
    selector: 'app-property-panel',
    templateUrl: './property-panel.component.html',
    styleUrls: ['./property-panel.component.scss']
})
export class PropertyPanelComponent implements OnInit, AfterViewInit {
    ///////////// model prop
    panelData: {
        type: PropertyPanelShowType;
        data: ModelInput;
    };
    selectedEvent = null;
    dataList: Array<GeoData> = [];
    disabledExecuteBtn = true;
    loadingExecuteBtn = false;
    msrid: string = null;

    ///////////// data prop
    geodata: GeoData = null;
    // data prop table
    hotTableIsLoading: boolean = true;
    hotTableColumns: Array<{
        data: string;
        title: string;
        type?: string;
    }> = null;
    hotTableData: Array<any> = null;
    hotTableSettings: object = {
        afterLoadData: firstLoad => {
            if (!firstLoad) {
                this.hotTableIsLoading = false;
            }
        }
    };
    hotInstance: string = null;
    hotContextMenu: any = null;
    // diagram configuration
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
    selectedDiagramType = null;
    _xAxisOptions = null;
    selectedXOption = null;
    _yAxisOptions = null;
    selectedyAxis = null;
    _canSubmit = false;

    // table show configuration
    tableShowCfg = null;

    ///////////// data compare configuration
    compareCfg: {
        left: GeoData;
        right: GeoData;
        parsed: Array<any>;
    } = undefined;
    _leftYOptions = undefined;
    _rightYOptions = undefined;
    selectedLeftYOption = undefined;
    selectedRightYOption = undefined;

    constructor(
        private modelToolService: ModelToolService,
        private _notification: NzNotificationService,
        private hotRegisterer: HotRegisterer,
        private echartAdapterService: EchartAdapterService
    ) {
        const self = this;
        // this.hotContextMenu = {
        //     items: {
        //         'copy': {},
        //         'chart': {
        //             name: 'chart',
        //             callback: function(key, options) {
        //                 // console.log(key, options);
        //                 const hot = self.hotRegisterer.getInstance(self.hotInstance);
        //                 const range = hot.getSelected();
        //                 console.log(hot.getData(range[0], range[1], range[2], range[3]));
        //             }
        //         }
        //     }
        // };
    }

    ngOnInit() {
        postal
            .channel('DATA_CHANNEL')
            .subscribe('data.add', (data, envelope) => {
                this.dataList = _.concat(this.dataList, data);
            });

        postal
            .channel('MODEL_TOOL_CHANNEL')
            .subscribe('invokeModelTool', (data, envelope) => {
                if (data.succeed) {
                    this.msrid = data.result.msrid;
                    const params = {
                        id: this.msrid
                    };
                    const query = undefined;
                    const body = undefined;
                    this.modelToolService.getInvokeRecord(params, query, body);
                } else {
                    this._notification.create(
                        'warning',
                        'Warning:',
                        `invoke model ${this.panelData.data
                            .msname} failed, please retry later!`
                    );
                }
            });

        postal
            .channel('MODEL_TOOL_CHANNEL')
            .subscribe('getInvokeRecord', (data, envelope) => {
                if (data.succeed) {
                    const msr = data.result;
                    if (msr.finished === false) {
                        setTimeout(() => {
                            const params = {
                                id: this.msrid
                            };
                            const query = undefined;
                            const body = undefined;
                            this.modelToolService.getInvokeRecord(
                                params,
                                query,
                                body
                            );
                        }, 5000);
                    } else {
                        this._notification.create(
                            'success',
                            'Info:',
                            `model ${this.panelData.data.msname} run succeed!`
                        );
                        // add msr output to data options
                        let newdatas = [];
                        const outputs = msr.outputs;
                        _.map(outputs, output => {
                            newdatas.push({
                                _id: output.DataId,
                                // gdid: output.DataId,
                                filename: output.filename,
                                tag: output.Tag,
                                path: '',
                                type: null
                            });
                        });
                        postal
                            .channel('DATA_CHANNEL')
                            .publish('data.add', newdatas);
                        this.disabledExecuteBtn = false;
                        this.loadingExecuteBtn = false;
                    }
                } else {
                    this._notification.create(
                        'warning',
                        'Warning:',
                        'get invoke record failed, please retry later!'
                    );
                }
            });

        postal
            .channel('PROP_CHANNEL')
            .subscribe('model-prop.bind', (data, envelope) => {
                this.panelData = data;
                this.selectedEvent = undefined;
                
                this.disabledExecuteBtn = true;
                this.loadingExecuteBtn = false;
            });

        postal
            .channel('PROP_CHANNEL')
            .subscribe('data-prop.bind', (data, envelope) => {
                if (
                    data.type === UDXType.TABLE_XML ||
                    data.type === UDXType.TABLE_RAW
                ) {
                    this.panelData = {
                        type: PropertyPanelShowType.DATA,
                        data: undefined
                    };

                    this.selectedDiagramType = undefined;
                    this.selectedXOption = undefined;
                    this.selectedyAxis = undefined;

                    this.geodata = data.geodata;
                    this.tableShowCfg = data.parsed.show;
                    this.hotTableColumns = data.parsed.prop.columns;
                    this.hotTableData = data.parsed.prop.data;

                    this.hotInstance = data._id;
                    this.hotTableIsLoading = false;

                    this._xAxisOptions = _.map(
                        this.tableShowCfg.columns,
                        col => {
                            return {
                                value: col.data,
                                label: col.title
                            };
                        }
                    );
                    this._yAxisOptions = _.map(
                        this.tableShowCfg.columns,
                        col => {
                            return {
                                value: col.data,
                                label: col.title,
                                checked: false
                            };
                        }
                    );
                }
            });

        postal
            .channel('PROP_CHANNEL')
            .subscribe('compare-prop.bind', (data, envelope) => {
                const udxType: UDXType = data.parsed[0].type;
                if (
                    udxType === UDXType.TABLE_XML ||
                    udxType === UDXType.TABLE_RAW
                ) {
                    this.panelData = {
                        type: PropertyPanelShowType.DATA_COMPARE,
                        data: undefined
                    };

                    this.selectedDiagramType = undefined;
                    this.selectedLeftYOption = undefined;
                    this.selectedRightYOption = undefined;

                    this.compareCfg = data;
                    _.chain(data.parsed)
                        .map((item, i) => {
                            const cols = _.get(item, 'parsed.show.columns');
                            if (i === 0) {
                                this._leftYOptions = _.map(cols, col => {
                                    return {
                                        value: col.data,
                                        label: col.title
                                    };
                                });
                            } else if (i === 1) {
                                this._rightYOptions = _.map(cols, col => {
                                    return {
                                        value: col.data,
                                        label: col.title
                                    };
                                });
                            }
                        })
                        .value();
                    this.panelData.type = PropertyPanelShowType.DATA_COMPARE;
                }
            });

        // TODO temporary testify
        let preloadData = {
            _id: '5a1122b1a5559025a032a197',
            gdid: 'gd_4d840810-bddd-11e7-8997-5576787ba1b7',
            filename: 'OPT.dayout.zip',
            path: '5a1122b1a5559025a032a197.zip',
            type: 1,
            tag: ''
        };
        postal.channel('DATA_CHANNEL').publish('data.add', preloadData);
        preloadData = {
            _id: '5a11234fa5559025a032a198',
            gdid: 'gd_4d840810-bddd-11e7-8997-5576787ba1b7',
            filename: 'AU-TUM.dayout.zip',
            path: '5a11234fa5559025a032a198.zip',
            type: 1,
            tag: ''
        };
        postal.channel('DATA_CHANNEL').publish('data.add', preloadData);
    }

    ngAfterViewInit() {
        jQuery('.ant-spin-container').css('height', '100%');
    }

    adjustTableH() {
        const tableH = jQuery('#prop-table table').css('height');
        // console.log(tableH);
        if (parseInt(tableH) < 240) {
            jQuery(
                '#prop-table .handsontable.htRowHeaders.htColumnHeaders'
            ).css('height', tableH);
            jQuery('#prop-table .ht_master.handsontable .wtHolder').css(
                'height',
                tableH
            );
        }
    }

    checkExecBtn() {
        let disabled = false;
        _.map(this.panelData.data.states, state => {
            _.map(state.inputs, input => {
                if (input.geodata === undefined || input.geodata === null) {
                    disabled = true;
                }
            });

            _.map(state.outputs, output => {
                if (
                    output.filename === undefined ||
                    output.filename === null ||
                    output.filename === ''
                ) {
                    disabled = true;
                }
            });
        });
        this.disabledExecuteBtn = disabled;
    }

    execute() {
        let inputdata = [];
        let outputdata = [];
        _.chain(this.panelData.data.states)
            .map(state => {
                _.chain(state.inputs)
                    .map(input => {
                        inputdata.push({
                            DataId: input.geodata._id,
                            Destroyed: false,
                            Event: input.name,
                            Optional: input.optional,
                            StateDes: state.$.description,
                            StateId: state.$.id,
                            StateName: state.$.name,
                            Tag: input.geodata.filename
                        });
                    })
                    .value();
                _.chain(state.outputs)
                    .map(output => {
                        outputdata.push({
                            Destroyed: false,
                            Event: output.name,
                            StateDes: state.$.description,
                            StateId: state.$.id,
                            StateName: state.$.name,
                            Tag: output.filename
                        });
                    })
                    .value();
            })
            .value();

        const query = {
            ac: 'run',
            auth: '',
            inputdata: JSON.stringify(inputdata),
            outputdata: JSON.stringify(outputdata)
        };
        const params = {
            id: this.panelData.data.msid
        };
        const body = undefined;
        this.modelToolService.invokeModelTool(params, query, body);
        // this.disabledExecuteBtn = true;
        this.loadingExecuteBtn = true;
    }

    checkChartCfg(cfgType: string) {
        if (
            this.selectedDiagramType == null ||
            this.selectedDiagramType.value == null
        ) {
            this._canSubmit = false;
            return;
        }
        if (cfgType === 'data') {
            const yAxises = _.chain(this._yAxisOptions)
                .filter('checked')
                .map(option => option.value)
                .value();
            if (yAxises.length != 0) {
                this._canSubmit = true;
            } else {
                this._canSubmit = false;
            }
        } else if (cfgType === 'compare') {
            if (
                this.selectedLeftYOption != null &&
                this.selectedLeftYOption.value != null &&
                this.selectedRightYOption != null &&
                this.selectedRightYOption.value != null
            ) {
                this._canSubmit = true;
            } else {
                this._canSubmit = false;
            }
        }
    }

    showTable() {
        postal
            .channel('DATA_CHANNEL')
            .publish('data.show', { _id: this.geodata._id });
    }

    showDiagram(type: string) {
        let njDiagram = new NJDiagram();
        let xColI, xAxisData, yColHeaders, yAxisDatas, coreOption, option, visualTitle;
        if (type === 'data') {
            njDiagram.geodata = this.geodata;
            visualTitle = this.geodata.filename;
        } else if (type === 'compare') {
            njDiagram.left = this.compareCfg.left;
            njDiagram.right = this.compareCfg.right;
            visualTitle = `${this.compareCfg.left.filename} vs ${this.compareCfg.right.filename}`;
        }
        xAxisData = this.getSelectedXData();
        yColHeaders = this.getSelectedYHeaders();
        yAxisDatas = this.getSelectedYData();

        // TODO yAxisData按照xAxisData的大小排序，此时列类型就派上用场了
        coreOption = this.echartAdapterService.multiSeries2DAdapter(
            xAxisData,
            yAxisDatas,
            yColHeaders
        );
        option = this.echartAdapterService.multiSeries2DAssembler(
            coreOption,
            this.selectedDiagramType.value
        );

        const length = coreOption.xAxisData.length;
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

        njDiagram.guid = uuidv1();
        njDiagram.option = option;

        postal
            .channel('VISUALIZATION')
            .publish('diagram.add', njDiagram);

        postal
            .channel('LAYOUT_CHANNEL')
            .publish('visualization.title', visualTitle);
    }

    getSelectedXData() {
        if (this.panelData.type === PropertyPanelShowType.DATA) {
            if (this.selectedXOption != undefined) {
                return _.chain(this.tableShowCfg.data)
                    .map(row => row[this.selectedXOption.value])
                    .value();
            } else {
                return undefined;
            }
        } else if (this.panelData.type === PropertyPanelShowType.DATA_COMPARE) {
            return undefined;
        }
    }

    getSelectedYHeaders() {
        if (this.panelData.type === PropertyPanelShowType.DATA) {
            return _.chain(this._yAxisOptions)
                .filter('checked')
                .map(option => option.value)
                .value();
        } else if (this.panelData.type === PropertyPanelShowType.DATA_COMPARE) {
            return [
                `${this.selectedLeftYOption.value} (${this.compareCfg.left
                    .filename})`,
                `${this.selectedRightYOption.value} (${this.compareCfg.right
                    .filename})`
            ];
        }
    }

    getSelectedYData() {
        if (this.panelData.type === PropertyPanelShowType.DATA) {
            const yColHeaders = _.chain(this._yAxisOptions)
                .filter('checked')
                .map(option => option.value)
                .value();
            const yData = [];
            _.chain(this.tableShowCfg.data)
                .map(row => {
                    _.map(yColHeaders, (yH, i) => {
                        if (yData.length <= i) {
                            yData.push([]);
                        }
                        yData[i].push(_.get(row, yH));
                    });
                })
                .value();
            return yData;
        } else if (this.panelData.type === PropertyPanelShowType.DATA_COMPARE) {
            return _.chain(this.compareCfg.parsed)
                .map(item => _.get(item, 'parsed.show.data'))
                .map((tableData, i) => {
                    let colName;
                    if(i === 0) {
                        colName = this.selectedLeftYOption.value;
                    }
                    else if(i === 1) {
                        colName = this.selectedRightYOption.value;
                    }
                    return _.map(tableData, row => _.get(row, colName));
                })
                .value();
        }
    }

    // hotAfterSelectionEnd(e) {
    //     const hot = this.hotRegisterer.getInstance(this.hotInstance);
    //     const range = hot.getSelected();
    //     hot.getData(range[0], range[1], range[2], range[3]);
    // }

    // hotSetMenu(e) {
    //     console.log(e);
    // }
}
