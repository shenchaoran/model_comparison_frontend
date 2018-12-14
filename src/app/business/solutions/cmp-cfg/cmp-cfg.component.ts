import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChange, HostListener, 
    OnDestroy, ViewChild, ChangeDetectorRef, Renderer2, ElementRef, } from "@angular/core";
import { Solution, Task, Topic, MS, CmpMethod, CmpObj, UDXSchema, Metric, } from "@models";
import * as ObjectId from 'objectid';
import * as uuidv1 from 'uuid/v1';
import { Observable } from 'rxjs';

@Component({
    selector: 'ogms-cmp-cfg',
    templateUrl: './cmp-cfg.component.html',
    styleUrls: ['./cmp-cfg.component.scss']
})
export class CmpCfgComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    @Input() cmpObjs: CmpObj[];
    @Input() mode: 'WRITE' | 'READ' = 'WRITE';
    @Input() mss: MS[];
    @Input() metrics: Metric[];
    @Output() valueChange = new EventEmitter<{
        value?: CmpObj[],
        valid: boolean
    }>();

    timeInterval: 'annual' | 'daily' | 'monthly' = 'annual';

    targetId;
    rowIndexColWidth = 30;
    checkboxCOlWidth = 30;
    featureNameColWidth = 70;
    featureDescColWidth = 150;
    msColWidth = 200;
    colHeaders = ['', 'Name', 'Description'];
    colWidths = [this.checkboxCOlWidth, this.featureNameColWidth, this.featureDescColWidth];
    columns: any[] = [{type: 'checkbox'}, {type: 'text',},{type: 'text',}];
    data = [];
    dataReferMatrix = [];


    @ViewChild('gridTable') gridTableRef: ElementRef;
    get hasNoCmpCfg() { 
        return this.mode === "READ" && (!this.cmpObjs || this.cmpObjs.length === 0);
    }

    constructor() {
        this.targetId = uuidv1();
    }

    ngOnInit() {
        this.getTableOption();
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        let mssChange = changes.mss;
        if(mssChange && !mssChange.firstChange) {
            let { currentValue, previousValue } = mssChange;
            this.getTableOption();
            this.buildTable();
            this.validate();
        }
    }

    onTimeIntervalChange() {
        let dom = _.get(this, 'gridTableRef.nativeElement')
        if(dom) {
            $(dom).jexcel('destroy')
            this.getTableOption();
            this.buildTable();
            this.validate();
        }
    }

    getTableOption() {
        if(this.mode === 'WRITE') {
            let preChecked = [];
            this.cmpObjs.map(cmpObj => {
                preChecked.push(cmpObj.name)
            })

            this.data = [];
            this.dataReferMatrix = [];
            this.colHeaders = ['', 'Name', 'Description'];
            this.colWidths = [this.checkboxCOlWidth, this.featureNameColWidth, this.featureDescColWidth];
            this.columns = [{type: 'checkbox'}, {type: 'text',},{type: 'text',}];

            let metricNames = new Set();
            if(!this.mss)
                return;

            this.mss.map((ms, i) => {
                this.colHeaders.push(ms.MDL.meta.name)
                this.colWidths.push(this.msColWidth)
                this.columns.push({type: 'text'})
                
                ms.MDL.IO.outputs.map(output => {
                    if(output.temporal !== this.timeInterval) 
                        return;
    
                    let schema: UDXSchema = _.find(ms.MDL.IO.schemas, schema => schema.id === output.schemaId)
                    if(!schema)
                        return;
                    if(schema.structure.type === 'table') {
                        _.map(schema.structure.columns, column => {
                            if(column.metricName) {
                                metricNames.add(column.metricName);
                            }
                        })
                    }
                    else if(schema.structure.type === 'NETCDF4') {
                        _.map(schema.structure.variables, variable => {
                            if(variable.metricName) {
                                metricNames.add(variable.metricName);
                            }
                        })
                    }
                })
            });

            for(let metricName of Array.from(metricNames)) {
                let row = [],
                    dataRefers = [],
                    metric: Metric = _.find(this.metrics, metric => metric.name === metricName),
                    checkRow = 0;
                if(_.find(preChecked, checkedItem => metricName === checkedItem)) {
                    checkRow = 1;
                }
                row.push(checkRow, metric.long_name, metric.description)
                this.mss.map((ms, i) => {
                    let cellData;
                    let output = _.find(ms.MDL.IO.outputs, output => output.temporal === this.timeInterval)
                    if(output) {
                        let schema: UDXSchema = _.find(ms.MDL.IO.schemas, schema => schema.id === output.schemaId);
                        if(schema) {
                            if(schema.structure.type === 'NETCDF4') {
                                let variable = _.find(schema.structure.variables, variable => variable.metricName === metricName)
                                if(variable) {
                                    let dataRefer = {
                                        msId: ms._id,
                                        msName: ms.MDL.meta.name,
                                        eventType: 'outputs',
                                        eventId: output.id,
                                        eventName: output.name,
                                        field: variable.name,
                                        schemaId: output.schemaId
                                    };
                                    dataRefers.push(dataRefer);
                                    cellData = `${output.name} -> ${variable.name}`
                                }
                            }
                            else if(schema.structure.type === 'table') {
                                let column = _.find(schema.structure.columns, column => column.metricName === metricName)
                                if(column) {
                                    let dataRefer = {
                                        msId: ms._id,
                                        msName: ms.MDL.meta.name,
                                        eventType: 'outputs',
                                        eventId: output.id,
                                        eventName: output.name,
                                        field: column.id,
                                        schemaId: output.schemaId
                                    };
                                    dataRefers.push(dataRefer);
                                    cellData = `${output.name} -> ${column.id}`
                                }
                            }
                        }
                    }
                    if(!cellData) {
                        cellData = '-';
                        dataRefers.push(null);
                    }

                    row.push(cellData);
                })
    
                this.dataReferMatrix.push(dataRefers);
                this.data.push(row)
            }
        }
        else if(this.mode === 'READ') {
            this.data = [];
            this.colHeaders = ['Name', 'Description'];
            this.colWidths = [this.featureNameColWidth, this.featureDescColWidth];
            this.columns = [{type: 'text',},{type: 'text',}];

            this.cmpObjs.map((cmpObj, i) => {
                let row = [];
                row.push(cmpObj.name)
                row.push(cmpObj.desc)
                cmpObj.dataRefers.map((dataRefer, j) => {
                    if(i === 0) {
                        this.colHeaders.push(dataRefer.msName)
                        this.colWidths.push(this.msColWidth)
                        this.columns.push({type: 'text'})
                    }
                    row.push(`${dataRefer.eventName} -> ${dataRefer.field}`)
                })
                this.data.push(row);
            })
        }
    }

    buildTable() {
        let dom = _.get(this, 'gridTableRef.nativeElement')
        if(!dom)
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

    ngAfterViewInit() {
        if(this.hasNoCmpCfg)
            return ;
        setTimeout(() => {
            this.buildTable();
        }, 10);
    }

    validate() {
        this.cmpObjs = [];

        let table = $(this.gridTableRef.nativeElement).jexcel('getData', false);
        table = table.map((row, i) => {
            if(row[0] === '1') {
                this.cmpObjs.push({
                    id: ObjectId().toString(),
                    name: row[1],
                    dataRefers: this.dataReferMatrix[i]
                } as any)
            }
        })
        let valid = !!this.cmpObjs.length
        if(valid) {
            this.valueChange.emit({
                valid: valid,
                value: this.cmpObjs,
            })
        }
        else {
            this.valueChange.emit({valid: false});
        }
    }

    ngOnDestroy() {
        let dom = _.get(this, 'gridTableRef.nativeElement')
        if(dom)
            $(dom).jexcel('destroy');
    }
}
