import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, HostListener, OnDestroy, ViewChild, ChangeDetectorRef, Renderer2, ElementRef, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ConversationService, SolutionService, UserService, MSService } from "@services";
import { Solution, Task, Topic, MS, CmpMethod, CmpObj, UDXSchema, Metric, } from "@models";
import * as ObjectId from 'objectid';
import * as uuidv1 from 'uuid/v1';
// import $ from 'jquery';

@Component({
    selector: 'ogms-cmp-cfg',
    templateUrl: './cmp-cfg.component.html',
    styleUrls: ['./cmp-cfg.component.scss']
})
export class CmpCfgComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() cmpObjs: CmpObj[];
    @Input() mode: 'WRITE' | 'READ' = 'WRITE';
    @Input() mss: MS[];
    @Input() metrics: Metric[];
    @Output() valueChange = new EventEmitter<{
        value?: CmpObj[],
        valid: boolean
    }>();

    targetId;
    rowIndexColWidth = 30;
    featureNameColWidth = 70;
    featureDescColWidth = 100;
    msColWidth = 100;
    colHeaders = ['Name', 'Description'];
    colWidths = [this.featureNameColWidth, this.featureDescColWidth];
    data = [['', '']];
    nestedHeaders = `
        <td class='jexcel_label' width='${this.rowIndexColWidth}'></td>
        <td class='jexcel_label h0' width='${this.featureNameColWidth}'></td>
        <td class='jexcel_label h1' width='${this.featureDescColWidth}'></td>
    `;
    columns: any[] = [
        {
            type: 'text',
            wordWrap: true,
        },
        {
            type: 'text',
            wordWrap: true,
        }
    ];

    @ViewChild('gridTable') gridTableRef: ElementRef;
    get hasNoCmpCfg() { 
        return this.mode === "READ" && (!this.cmpObjs || this.cmpObjs.length === 0);
    }

    constructor() {
        this.targetId = uuidv1();
    }

    ngOnInit() {
        this.data = [];
        this.cmpObjs.map((cmpObj, i) => {
            if(i === 0 && this.mode === 'READ') {
                cmpObj.dataRefers.map((dataRefer, j) => {
                    this.nestedHeaders += `<td colspan='2' class='jexcel_label  h${j*2+2} h${j*2+3}' width='${this.msColWidth*2}' align='center'>${dataRefer.msName}</td>`;
                    this.columns.push({type: 'text', wordWrap: true,}, {type: 'text', wordWrap: true,});
                    this.colWidths.push(this.msColWidth, this.msColWidth);
                    this.colHeaders.push(`Output`, `Variable`);
                })
            }
            let row = [cmpObj.name, cmpObj.desc]
            cmpObj.dataRefers.map(dataRefer => {
                row.push(dataRefer.eventName, dataRefer.field)
            })
            this.data.push(row);
        })
        if(this.mode === 'WRITE') {
            // if(this.data.length === 0)
            //     this.data.push(['', '']);
            _.forEach(this.mss, (ms, i) => {
                // if(this.data.length === 1)
                //     this.data[0].push('', '');
                this.colHeaders.push(`Output`, `Variable`);
                this.colWidths.push(this.msColWidth, this.msColWidth);
                this.columns.push(
                    {
                        type: 'dropdown',
                        wordWrap: true,
                        source: ms.MDL.IO.outputs.map((output, i) => {
                            return {
                                id: output.name,
                                name: output.name
                            }
                        })
                    },
                    {
                        type: 'dropdown',
                        wordWrap: true,
                        source: (()=> {
                            let source = new Set();
                            _.map(ms.MDL.IO.schemas, schema => {
                                if(schema.structure.type === 'NETCDF4') {
                                    schema.structure.variables.map((variable, i) => {
                                        source.add(variable.name);
                                    });
                                }
                                else if(schema.structure.type === 'table') {
                                    schema.structure.columns.map((column, i) => {
                                        source.add(column.id)
                                    })
                                }
                            })
                            return Array.from(source);
                        })(),
                        filter: (instance, cell, colIndex, rowIndex, source) => {
                            let outputName = $(this.gridTableRef.nativeElement).jexcel('getValue', `${colIndex - 1}-${rowIndex}`);
                            if(!outputName) {
                                return []
                            }
                            let msIndex = Math.floor((colIndex - 2)/2);
                            let schemaId = _.chain(this.mss[msIndex].MDL.IO.outputs)
                                .find(output => output.name === outputName)
                                .get('schemaId')
                                .value();
                            let schema: UDXSchema = _.find(this.mss[msIndex].MDL.IO.schemas, schema => schema.id === schemaId);
                            if(schema.structure.type === 'NETCDF4') {
                                return schema.structure.variables.map((variable, i) => {
                                    return {
                                        id: variable.name,
                                        name: variable.name,
                                    }
                                });
                                // _.chain(schema.structure.variables)
                                //     // .filter(variable => variable.name != '')
                                //     .map(variable => {id: })
                            }
                            else if(schema.structure.type === 'table') {
                                return schema.structure.columns.map((column, i) => {
                                    return {
                                        id: column.id,
                                        name: column.id
                                    }
                                })
                            }
                            else {
                                return [];
                            }
                        }
                    }
                );
                this.nestedHeaders += `<td colspan='2' class='jexcel_label  h${i*2+2} h${i*2+3}' width='${this.msColWidth*2}' align='center'>${ms.MDL.meta.name}</td>`;
            });
        }
    }

    ngAfterViewInit() {
        if(this.hasNoCmpCfg)
            return ;
        setTimeout(() => {
            $(this.gridTableRef.nativeElement).jexcel({
                wordWrap: true,
                contextMenu: () => {
                    event.stopPropagation();
                    event.preventDefault();
                    return false;
                },
                colHeaders: this.colHeaders,
                colWidths: this.colWidths,
                columns: this.columns,
                allowInsertColumn: false,
                allowDeleteColumn: false,
                allowInsertRow: this.mode === 'WRITE'? true: false,
                allowDeleteRow: this.mode === 'WRITE'? true: false,
                data: this.data,
                minSpareRows: this.mode === 'WRITE'? 1: 0,
                editable: this.mode === 'WRITE'? true: false,
                onchange:  (instance, cell, value) => {
                    let cellName = $(instance).jexcel('getColumnNameFromId', $(cell).prop('id'));
                    let colIndex = cellName[0].charCodeAt() - 'A'.charCodeAt(0);
                    if(colIndex > 1 && colIndex%2 === 0) {
                        let variableCell = `${String.fromCharCode(colIndex + 1 + 'A'.charCodeAt(0))}${cellName[1]}`
                        $(instance).jexcel('setValue', variableCell, '')
                    }
                },
                onafterchange: () => {
                    let table = $(this.gridTableRef.nativeElement).jexcel('getData', false);
                    this.validate(table);
                }
            });
            $(this.gridTableRef.nativeElement).find('thead').before(`<thead class='jexcel_label'><tr>${this.nestedHeaders}</tr></thead>`);
            
            let table = $(this.gridTableRef.nativeElement).jexcel('getData', false);
            this.validate(table);
        }, 10);
    }

    validate(table) {
        table.splice(-1, 1);
        table = table.map(row => {
            row = row.slice(0, this.mss.length*2 + 2)
            return row;
        })
        let valid = _.every(table, row => {
            // return _.every(row, cell => !!cell)
            let isRowValid = true;
            for(let i=0; i< row.length; i++) {
                // 第二列可选
                if(i === 1) {
                    continue;
                }
                if(!row[i]) {
                    isRowValid = false;
                    break;
                }
            }
            return isRowValid;
        })
        if(valid) {
            this.cmpObjs = [];
            table.map((row, i) => {
                let dataRefers = [];
                for(let i=0; i< this.mss.length;i++) {
                    let ms = this.mss[i],
                        eventName = row[i*2 + 2],
                        eventField = row[i*2 + 3];
                    let event = _.find(ms.MDL.IO.outputs, output => output.name === eventName);
                    dataRefers.push({
                        msId: ms._id,
                        msName: ms.MDL.meta.name,
                        eventType: 'outputs',
                        eventId: event.id,
                        eventName: eventName,
                        field: eventField,
                        schemaId: event.schemaId,
                    })
                }
                this.cmpObjs.push({
                    id: ObjectId().toString(),
                    name: row[0],
                    desc: row[1],
                    dataRefers: dataRefers,
                } as any)
            })
            if(table.length) {
                this.valueChange.emit({
                    valid: true,
                    value: this.cmpObjs,
                });
            }
            else {
                this.valueChange.emit({valid: false});
            }
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
