import {
    Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChange, HostListener,
    OnDestroy, ViewChild, ChangeDetectorRef, Renderer2, ElementRef,
} from "@angular/core";
import {
    Solution, Task, Topic, MS, CmpMethod,
    CmpObj, UDXSchema, Metric, STDData,
} from "@models";
import { SchemaService, SolutionService } from '@services';
import * as ObjectId from 'objectid';
import * as uuidv1 from 'uuid/v1';
import { Observable, observable } from 'rxjs';

@Component({
    selector: 'ogms-cmp-cfg',
    templateUrl: './cmp-cfg.component.html',
    styleUrls: ['./cmp-cfg.component.scss']
})
export class CmpCfgComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    @Input() temporal: number = 30;          // 1 8 30 365
    @Input() cmpObjs: CmpObj[];
    @Input() mode: 'WRITE' | 'READ' = 'WRITE';
    @Input() mss: MS[];
    @Input() observations: STDData[];
    @Input() metrics: Metric[];
    @Output() valueChange = new EventEmitter<{
        value?: CmpObj[],
        valid: boolean
    }>();
    @Output() temporalChange = new EventEmitter<number>();

    targetId;
    rowIndexColWidth = 30;
    checkboxCOlWidth = 30;
    featureNameColWidth = 70;
    featureDescColWidth = 150;
    msColWidth = 80;
    colHeaders = ['', 'Name', 'Description'];
    colWidths = [this.checkboxCOlWidth, this.featureNameColWidth, this.featureDescColWidth];
    columns: any[] = [{ type: 'checkbox' }, { type: 'text', }, { type: 'text', }];
    data = [];
    dataReferMatrix = [];


    @ViewChild('gridTable') gridTableRef: ElementRef;
    get hasNoCmpCfg() {
        return this.mode === "READ" && (!this.cmpObjs || this.cmpObjs.length === 0);
    }
    get validTemporalOptions() {return this.solutionService.validTemporalOptions}
    get readTemporal() {
        if(this.temporal == 30)
            return '1 month'
        else if(this.temporal == 1)
            return '1 day'
        else if(this.temporal == 8) 
            return '8 days'
        else if(this.temporal == 365)
            return '1 year'
        else 
            return ''
    }

    constructor(
        private schemaService: SchemaService,
        public solutionService: SolutionService,
    ) {
        this.targetId = uuidv1();
    }

    ngOnInit() {
        this.getTableOption();
    }

    ngAfterViewInit() {
        if (this.hasNoCmpCfg)
            return;
        setTimeout(() => {
            this.buildTable();
            this.validate();
        }, 10);
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        let mssChange = changes.mss,
            obsChange = changes.observations;
        if (
            (mssChange && !mssChange.firstChange) ||
            (obsChange && !obsChange.firstChange)
        ) {
            // let { currentValue, previousValue } = mssChange;
            this.getTableOption();
            this.buildTable();
            this.validate();
        }
    }

    onTimeIntervalChange() {
        this.temporalChange.emit(this.temporal);
        let dom = _.get(this, 'gridTableRef.nativeElement')
        if (dom) {
            $(dom).jexcel('destroy')
            this.getTableOption();
            this.buildTable();
            this.validate();
        }
    }

    getTableOption() {
        if (this.mode === 'WRITE') {
            let preChecked = [];
            this.cmpObjs.map(cmpObj => {
                preChecked.push(cmpObj.name)
            })

            this.data = [];
            this.dataReferMatrix = [];
            this.colHeaders = ['', 'Name', 'Description'];
            this.colWidths = [this.checkboxCOlWidth, this.featureNameColWidth, this.featureDescColWidth];
            this.columns = [{ type: 'checkbox' }, { type: 'text', }, { type: 'text', }];

            let metricNames = new Set();
            if (!this.mss)
                return;

            // get all metric name
            this.mss.map((ms, i) => {
                this.colHeaders.push(ms.MDL.meta.name)
                this.colWidths.push(this.msColWidth)
                this.columns.push({ type: 'text' })

                ms.MDL.IO.outputs.map(output => {
                    // if(output.temporal !== this.temporal) 
                    if (output.temporal !== 'daily')
                        return;

                    let schema: UDXSchema = this.schemaService.getById(output.schemaId)
                    if (!schema)
                        return;
                    if (schema.structure.type === 'table') {
                        _.map(schema.structure.columns, column => {
                            if (column.metricName) {
                                metricNames.add(column.metricName);
                            }
                        })
                    }
                    else if (schema.structure.type === 'NETCDF4') {
                        _.map(schema.structure.variables, variable => {
                            if (variable.metricName) {
                                metricNames.add(variable.metricName);
                            }
                        })
                    }
                })
            });
            this.observations.map(obs => {
                this.colHeaders.push(obs.meta.name)
                this.colWidths.push(this.msColWidth)
                this.columns.push({ type: 'text' })
            })

            for (let metricName of Array.from(metricNames)) {
                let row = [],
                    dataRefers = [],
                    metric: Metric = _.find(this.metrics, metric => metric.name === metricName),
                    checkRow = 0;
                if (_.find(preChecked, checkedItem => metricName === checkedItem)) {
                    checkRow = 1;
                }
                row.push(checkRow, metric.long_name, metric.description)
                this.mss.map((ms, i) => {
                    let cellData;
                    let output = _.find(ms.MDL.IO.outputs, output => output.temporal === 'daily')
                    if (output) {
                        let schema: UDXSchema = this.schemaService.getById(output.schemaId)
                        if (schema) {
                            if (schema.structure.type === 'NETCDF4') {
                                let variable = _.find(schema.structure.variables, variable => variable.metricName === metricName)
                                if (variable) {
                                    let dataRefer = {
                                        type: 'simulation',
                                        msId: ms._id,
                                        msName: ms.MDL.meta.name,
                                        eventType: 'outputs',
                                        eventId: output.id,
                                        eventName: output.name,
                                        field: variable.name,
                                        schemaId: output.schemaId
                                    };
                                    dataRefers.push(dataRefer);
                                    cellData = `<span style='color: green;'>&radic;</span>`
                                }
                            }
                            else if (schema.structure.type === 'table') {
                                let column = _.find(schema.structure.columns, column => column.metricName === metricName)
                                if (column) {
                                    let dataRefer = {
                                        type: 'simulation',
                                        msId: ms._id,
                                        msName: ms.MDL.meta.name,
                                        eventType: 'outputs',
                                        eventId: output.id,
                                        eventName: output.name,
                                        field: column.id,
                                        schemaId: output.schemaId
                                    };
                                    dataRefers.push(dataRefer);
                                    cellData = `<span style='color: green;'>&radic;</span>`
                                }
                            }
                        }
                    }
                    if (!cellData) {
                        cellData = `<span style='color: red;'>&times;</mat-icon>`
                        dataRefers.push(null);
                    }

                    row.push(cellData);
                })

                this.observations.map(obs => {
                    let cellData;
                    let schema = this.schemaService.getById(obs.schemaId)
                    if (schema.structure.type === 'NETCDF4') {
                        let variable = _.find(schema.structure.variables, variable => variable.metricName === metricName)
                        if (variable) {
                            let dataRefer = {
                                type: 'observation',
                                stdId: obs._id.toString(),
                                stdName: obs.meta.name,
                                field: variable.name,
                                schemaId: obs.schemaId,
                            };
                            dataRefers.push(dataRefer);
                            cellData = `<span style='color: green;'>&radic;</span>`
                        }
                    }
                    else if (schema.structure.type === 'obs-table') {
                        let column = _.find(schema.structure.columns, column => column.metricName === metricName)
                        if (column) {
                            let dataRefer = {
                                type: 'observation',
                                stdId: obs._id.toString(),
                                stdName: obs.meta.name,
                                field: column.id,
                                schemaId: obs.schemaId,
                            };
                            dataRefers.push(dataRefer);
                            cellData = `<span style='color: green;'>&radic;</span>`
                        }
                    }

                    if (!cellData) {
                        cellData = `<span style='color: red;'>&times;</span>`
                    }
                    row.push(cellData);
                })

                this.dataReferMatrix.push(dataRefers);
                this.data.push(row)
            }
        }
        else if (this.mode === 'READ') {
            this.data = [];
            this.colHeaders = ['Name', 'Description'];
            this.colWidths = [this.featureNameColWidth, this.featureDescColWidth];
            this.columns = [{ type: 'text', }, { type: 'text', }];

            this.cmpObjs.map((cmpObj, i) => {
                let row = [];
                row.push(cmpObj.name, cmpObj.desc)
                cmpObj.dataRefers.map(dataRefer => {
                    if (dataRefer.type === 'simulation') {
                        if (this.colHeaders.find(str => str === dataRefer.msName))
                            return
                        this.colHeaders.push(dataRefer.msName)
                        this.colWidths.push(this.msColWidth)
                        this.columns.push({ type: 'text' })
                    }
                    else if (dataRefer.type === 'observation') {
                        if (this.colHeaders.find(str => str === dataRefer.stdName))
                            return
                        this.colHeaders.push(dataRefer.stdName)
                        this.colWidths.push(this.msColWidth)
                        this.columns.push({ type: 'text' })
                    }
                })
                this.colHeaders.map((colHeader, j) => {
                    if (j > 1) {
                        let dataRefer = _.find(cmpObj.dataRefers, dataRefer => {
                            return dataRefer.msName === colHeader || dataRefer.stdName === colHeader;
                        })
                        if (dataRefer) {
                            row.push(`<span style='color: green;'>&radic;</span>`)
                        }
                        else
                            row.push(`<span style='color: red;'>&times;</span>`)
                    }
                })
                this.data.push(row);
            })
        }
    }

    buildTable() {
        let dom = _.get(this, 'gridTableRef.nativeElement')
        if (!dom)
            return;
        $(dom).jexcel({
            contextMenu: () => {
                event.stopPropagation();
                event.preventDefault();
                return false;
            },
            colHeaders: this.colHeaders,
            colWidths: this.colWidths,
            columns: this.columns,
            data: this.data,
            allowInsertColumn: false,
            allowDeleteColumn: false,
            allowInsertRow: false,
            allowDeleteRow: false,
            minSpareRows: 0,
            editable: false,
            onchange: (instance, cell, value) => {

            },
            onbeforechange: (instance, cell, value) => {

            },
            onafterchange: () => this.validate(),
        });
    }

    validate() {
        this.cmpObjs = [];

        let table = $(this.gridTableRef.nativeElement).jexcel('getData', false);
        table = table.map((row, i) => {
            if (row[0] === '1') {
                this.cmpObjs.push({
                    id: ObjectId().toString(),
                    name: row[1],
                    dataRefers: this.dataReferMatrix[i]
                } as any)
            }
        })
        let valid = !!this.cmpObjs.length
        if (valid) {
            this.valueChange.emit({
                valid: valid,
                value: this.cmpObjs,
            })
        }
        else {
            this.valueChange.emit({ valid: false });
        }
        this.temporalChange.emit(this.temporal);
    }

    ngOnDestroy() {
        let dom = _.get(this, 'gridTableRef.nativeElement')
        if (dom)
            $(dom).jexcel('destroy');
    }
}
