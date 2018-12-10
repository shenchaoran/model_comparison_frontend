import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, HostListener, OnDestroy, ViewChild, ChangeDetectorRef, Renderer2, ElementRef, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ConversationService, SolutionService, UserService, MSService } from "@services";
import { Solution, Task, Topic, MS, CmpMethod, CmpObj, UDXSchema, } from "@models";
import * as ObjectId from 'objectid';

@Component({
    selector: 'ogms-cmp-cfg',
    templateUrl: './cmp-cfg.component.html',
    styleUrls: ['./cmp-cfg.component.scss']
})
export class CmpCfgComponent implements OnInit, AfterViewInit {
    @Input() cmpObjs: CmpObj[];
    @Input() mode: 'WRITE' | 'READ' = 'WRITE';
    @Input() mss: MS[];
    @Output() validChange = new EventEmitter<{
        value?: any,
        valid: boolean
    }>();
    rowIndexColWidth = 30;
    msColWidth = 100;
    featureNameColWidth = 70;
    featureDescColWidth = 100;
    colHeaders = ['Name', 'Description'];
    colWidths = [this.featureNameColWidth, this.featureDescColWidth];
    data = [['', '']];
    nestedHeaders = `
        <td class='jexcel_label' width='${this.rowIndexColWidth}'></td>
        <td class='jexcel_label' width='${this.featureNameColWidth}'></td>
        <td class='jexcel_label' width='${this.featureDescColWidth}'></td>
    `;
    columns: any[] = [
        {
            type: 'text',
        },
        {
            type: 'text',
        }
    ];

    @ViewChild('gridTable') gridTableRef: ElementRef;
    readModeData: any[];
    get hasNoCmpCfg() { 
        return this.mode === "READ" && (!this.cmpObjs || this.cmpObjs.length === 0);
    }

    constructor() { }

    ngOnInit() {
        this.data = [];
        this.cmpObjs.map((cmpObj, i) => {
            if(i === 0 && this.mode === 'READ') {
                cmpObj.dataRefers.map(dataRefer => {
                    this.nestedHeaders += `<td colspan='2' width='${this.msColWidth*2}' align='center'>${dataRefer.msName}</td>`;
                    this.columns.push({type: 'text'}, {type: 'text'});
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
            this.mss.forEach((ms, i) => {
                // if(this.data.length === 1)
                //     this.data[0].push('', '');
                this.colHeaders.push(`Output`, `Variable`);
                this.colWidths.push(this.msColWidth, this.msColWidth);
                this.columns.push(
                    {
                        type: 'dropdown',
                        source: ms.MDL.IO.outputs.map((output, i) => {
                            return {
                                id: output.name,
                                name: output.name
                            }
                        })
                    },
                    {
                        type: 'dropdown',
                        source: (()=> {
                            let source = new Set();
                            _.map(ms.MDL.IO.schemas, schema => {
                                if(schema.structure.type === 'NETCDF4') {
                                    schema.structure.variables.map((variable, i) => {
                                        source.add(variable.name);
                                    });
                                }
                                else if(schema.structure.type === 'table') {
                                    schema.structure.this.columns.map((column, i) => {
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
                this.nestedHeaders += `<td colspan='2' width='${this.msColWidth*2}' align='center'>${ms.MDL.meta.name}</td>`;
            });
        }
    }

    ngAfterViewInit() {
        if(this.hasNoCmpCfg)
            return ;
        setTimeout(() => {
            let excelOpt = {
                colHeaders: this.colHeaders,
                colWidths: this.colWidths,
                columns: this.columns,
                allowDeleteColumn: false,
                allowDeleteRow: this.mode === 'WRITE'? true: false,
                data: this.data,
                minSpareRows: this.mode === 'WRITE'? 1: 0,
                editable: this.mode === 'WRITE'? true: false,
                onchange: (instance, cell, value) => {
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
                },
            };
            $(this.gridTableRef.nativeElement).jexcel(excelOpt);
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
            return _.every(row, cell => !!cell)
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
                this.validChange.emit({
                    valid: true,
                    value: this.cmpObjs,
                });
            }
            else {
                this.validChange.emit({valid: false});
            }
        }
        else {
            this.validChange.emit({valid: false});
        }
    }
}
