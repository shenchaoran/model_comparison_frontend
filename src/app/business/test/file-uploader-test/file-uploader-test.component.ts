import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UploadInput } from 'ngx-uploader';
import { ResourceSrc } from '@models';
import { cloneDeep } from 'lodash';
import echarts from 'echarts';

@Component({
    selector: 'ogms-file-uploader-test',
    templateUrl: './file-uploader-test.component.html',
    styleUrls: ['./file-uploader-test.component.scss'],
})
export class FileUploaderTestComponent implements OnInit {
    @ViewChild('echartDOM') echartDOM: ElementRef;
    uploadInput: UploadInput;
    fileId;

    checkOptionsOne = [
        { label: 'Apple', value: 'Apple', checked: true },
        { label: 'Pear', value: 'Pear', checked: false },
        { label: 'Orange', value: 'Orange', checked: false }
    ];

    cascaderData = [{
        value: 1,
        text: 'one',
        children: [{
            value: 11,
            text: 'one one',
        }, {
            value: 12,
            text: 'one two',
            children: [{
                value: 121,
                text: 'one two one',
            }, {
                value: 122,
                text: 'one two two',
            }]
        }]
    }, {
        value: 2,
        text: 'two',
    }];
    cascaderValue: number[] = [];
    cascaderData2 = cloneDeep(this.cascaderData);

    options = {
        "placeholder": "Data type",
        "children": [
            {
                "placeholder": "Data item",
                "label": "Input",
                "value": "inputs",
                "children": [
                    {
                        "placeholder": "Table column",
                        "label": "Initialization file",
                        "value": {
                            "ext": ".ini",
                            "description": "",
                            "schemaId": "ini",
                            "name": "Initialization file",
                            "id": "--i"
                        },
                        "children": [
                            {
                                "label": "leafc_to_litr1c",
                                "value": "leafc_to_litr1c"
                            },
                            {
                                "label": "leafc_to_litr2c",
                                "value": "leafc_to_litr2c"
                            },
                            {
                                "label": "leafc_to_litr3c",
                                "value": "leafc_to_litr3c"
                            },
                            {
                                "label": "leafc_to_litr4c",
                                "value": "leafc_to_litr4c"
                            },
                            {
                                "label": "proj_lai",
                                "value": "proj_lai"
                            },
                            {
                                "label": "all_lai",
                                "value": "all_lai"
                            },
                            {
                                "label": "daily_hr",
                                "value": "daily_hr"
                            }
                        ]
                    },
                    {
                        "placeholder": "Table column",
                        "label": "Meteorological data",
                        "value": {
                            "ext": ".mtc43",
                            "description": "meteorology data, include year, tmax, tmin, tday, prcp, vpd, srad, daylen",
                            "schemaId": "met_data",
                            "name": "Meteorological data",
                            "id": "--m"
                        },
                        "children": [
                            {
                                "label": "leafc_to_litr1c",
                                "value": "leafc_to_litr1c"
                            },
                            {
                                "label": "leafc_to_litr2c",
                                "value": "leafc_to_litr2c"
                            },
                            {
                                "label": "leafc_to_litr3c",
                                "value": "leafc_to_litr3c"
                            },
                            {
                                "label": "leafc_to_litr4c",
                                "value": "leafc_to_litr4c"
                            },
                            {
                                "label": "proj_lai",
                                "value": "proj_lai"
                            },
                            {
                                "label": "all_lai",
                                "value": "all_lai"
                            },
                            {
                                "label": "daily_hr",
                                "value": "daily_hr"
                            }
                        ]
                    },
                    {
                        "placeholder": "Table column",
                        "label": "Restart input",
                        "value": {
                            "ext": ".endpoint",
                            "description": "",
                            "schemaId": "restart",
                            "name": "Restart input",
                            "id": "--ri"
                        },
                        "children": [
                            {
                                "label": "leafc_to_litr1c",
                                "value": "leafc_to_litr1c"
                            },
                            {
                                "label": "leafc_to_litr2c",
                                "value": "leafc_to_litr2c"
                            },
                            {
                                "label": "leafc_to_litr3c",
                                "value": "leafc_to_litr3c"
                            },
                            {
                                "label": "leafc_to_litr4c",
                                "value": "leafc_to_litr4c"
                            },
                            {
                                "label": "proj_lai",
                                "value": "proj_lai"
                            },
                            {
                                "label": "all_lai",
                                "value": "all_lai"
                            },
                            {
                                "label": "daily_hr",
                                "value": "daily_hr"
                            }
                        ]
                    },
                    {
                        "placeholder": "Table column",
                        "label": "Restart output",
                        "value": {
                            "ext": ".endpoint",
                            "description": "",
                            "schemaId": "restart",
                            "name": "Restart output",
                            "id": "--ro"
                        },
                        "children": [
                            {
                                "label": "leafc_to_litr1c",
                                "value": "leafc_to_litr1c"
                            },
                            {
                                "label": "leafc_to_litr2c",
                                "value": "leafc_to_litr2c"
                            },
                            {
                                "label": "leafc_to_litr3c",
                                "value": "leafc_to_litr3c"
                            },
                            {
                                "label": "leafc_to_litr4c",
                                "value": "leafc_to_litr4c"
                            },
                            {
                                "label": "proj_lai",
                                "value": "proj_lai"
                            },
                            {
                                "label": "all_lai",
                                "value": "all_lai"
                            },
                            {
                                "label": "daily_hr",
                                "value": "daily_hr"
                            }
                        ]
                    },
                    {
                        "placeholder": "Table column",
                        "label": "CO2 concentration",
                        "value": {
                            "ext": ".txt",
                            "description": "",
                            "schemaId": "co2",
                            "name": "CO2 concentration",
                            "id": "--co2"
                        },
                        "children": [
                            {
                                "label": "leafc_to_litr1c",
                                "value": "leafc_to_litr1c"
                            },
                            {
                                "label": "leafc_to_litr2c",
                                "value": "leafc_to_litr2c"
                            },
                            {
                                "label": "leafc_to_litr3c",
                                "value": "leafc_to_litr3c"
                            },
                            {
                                "label": "leafc_to_litr4c",
                                "value": "leafc_to_litr4c"
                            },
                            {
                                "label": "proj_lai",
                                "value": "proj_lai"
                            },
                            {
                                "label": "all_lai",
                                "value": "all_lai"
                            },
                            {
                                "label": "daily_hr",
                                "value": "daily_hr"
                            }
                        ]
                    },
                    {
                        "placeholder": "Table column",
                        "label": "Ecophysiological Constants",
                        "value": {
                            "ext": ".epc",
                            "description": "",
                            "schemaId": "epc",
                            "name": "Ecophysiological Constants",
                            "id": "--epc"
                        },
                        "children": [
                            {
                                "label": "leafc_to_litr1c",
                                "value": "leafc_to_litr1c"
                            },
                            {
                                "label": "leafc_to_litr2c",
                                "value": "leafc_to_litr2c"
                            },
                            {
                                "label": "leafc_to_litr3c",
                                "value": "leafc_to_litr3c"
                            },
                            {
                                "label": "leafc_to_litr4c",
                                "value": "leafc_to_litr4c"
                            },
                            {
                                "label": "proj_lai",
                                "value": "proj_lai"
                            },
                            {
                                "label": "all_lai",
                                "value": "all_lai"
                            },
                            {
                                "label": "daily_hr",
                                "value": "daily_hr"
                            }
                        ]
                    }
                ]
            },
            {
                "placeholder": "Data item",
                "label": "Output",
                "value": "outputs",
                "children": [
                    {
                        "placeholder": "Table column",
                        "label": "daily output",
                        "value": {
                            "ext": ".dayout.ascii",
                            "description": "",
                            "schemaId": "daily_output",
                            "name": "daily output",
                            "id": "--do"
                        },
                        "children": [
                            {
                                "label": "leafc_to_litr1c",
                                "value": "leafc_to_litr1c"
                            },
                            {
                                "label": "leafc_to_litr2c",
                                "value": "leafc_to_litr2c"
                            },
                            {
                                "label": "leafc_to_litr3c",
                                "value": "leafc_to_litr3c"
                            },
                            {
                                "label": "leafc_to_litr4c",
                                "value": "leafc_to_litr4c"
                            },
                            {
                                "label": "proj_lai",
                                "value": "proj_lai"
                            },
                            {
                                "label": "all_lai",
                                "value": "all_lai"
                            },
                            {
                                "label": "daily_hr",
                                "value": "daily_hr"
                            }
                        ]
                    },
                    {
                        "placeholder": "Table column",
                        "label": "annual output",
                        "value": {
                            "ext": ".annout.ascii",
                            "description": "",
                            "schemaId": "ann_output",
                            "name": "annual output",
                            "id": "--ao"
                        },
                        "children": [
                            {
                                "label": "leafc_to_litr1c",
                                "value": "leafc_to_litr1c"
                            },
                            {
                                "label": "leafc_to_litr2c",
                                "value": "leafc_to_litr2c"
                            },
                            {
                                "label": "leafc_to_litr3c",
                                "value": "leafc_to_litr3c"
                            },
                            {
                                "label": "leafc_to_litr4c",
                                "value": "leafc_to_litr4c"
                            },
                            {
                                "label": "proj_lai",
                                "value": "proj_lai"
                            },
                            {
                                "label": "all_lai",
                                "value": "all_lai"
                            },
                            {
                                "label": "daily_hr",
                                "value": "daily_hr"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    selectData;

    constructor() {
        this.uploadInput = {
            type: 'uploadAll',
            url: '/data',
            method: 'POST',
            data: {
                desc: '',
                src: ResourceSrc.EXTERNAL
            },
            fieldName: 'geo-data',
            headers: {
                Authorization: 'bearer ' + JSON.parse(localStorage.getItem('jwt')).token
            }
        };
    }

    ngOnInit() {
    }

    onCascaderChange(e, type) {
        console.log(this.cascaderValue);
        console.log(type, e)
    }

    onSelected(e) {
        console.log(e);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.buildChart();

        }, 0);
    }

    buildChart() {
        var myChart = echarts.init(this.echartDOM.nativeElement);
        var option = {
            title: {
                text: 'ECharts ????'
            },
            tooltip: {},
            legend: {
                data: ['??']
            },
            xAxis: {
                data: ["??", "???", "???", "??", "???", "??"]
            },
            yAxis: {},
            series: [{
                name: '??',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        myChart.setOption(option);
    }

    onUploaded(id) {
        console.log(id);
        this.fileId = id;
    }

    _onFileUpload(e) {

    }

    _onFileUploadCompleted(data) {
        if (data.error) {

        }
        else {

        }
    }

    _onClearUploaded() {

    }
}
