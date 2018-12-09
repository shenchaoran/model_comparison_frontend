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
    @Output() valueChange = new EventEmitter<any>();
    @Output() validChange = new EventEmitter<boolean>();

    @ViewChild('gridTable') gridTableRef: ElementRef;
    readModeData: any[];

    constructor() { }

    ngOnInit() {
        if(this.mode === 'READ') {
            this.readModeData = this.cmpObjs.map(cmpObj => {
                let row = [cmpObj.name, cmpObj.desc]
                cmpObj.dataRefers.map(dataRefer => {
                    row.push(dataRefer.eventName, dataRefer.field)
                })
                return row;
            })
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            let rowIndexColWidth = 30,
                msColWidth = 100,
                featureNameColWidth = 70,
                featureDescColWidth = 100,
                colHeaders = ['Name', 'Description'],
                colWidths = [featureNameColWidth, featureDescColWidth],
                data = [['', '']],
                nestedHeaders = `
                <td class='jexcel_label' width='${rowIndexColWidth}'></td>
                <td class='jexcel_label' width='${featureNameColWidth}'></td>
                <td class='jexcel_label' width='${featureDescColWidth}'></td>
                `,
                columns: any[] = [
                    {
                        type: 'text',
                    },
                    {
                        type: 'text',
                    }
                ]
            this.mss.forEach((ms, i) => {
                data[0].push('', '');
                colHeaders.push(`Output`, `Variable`);
                colWidths.push(msColWidth, msColWidth);
                columns.push(
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
                nestedHeaders += `<td colspan='2' width='${msColWidth*2}' align='center'>${ms.MDL.meta.name}</td>`;
            });
            let excelOpt = {
                colHeaders: colHeaders,
                colWidths: colWidths,
                columns: columns,
                data: this.mode === 'WRITE'? data: this.readModeData,
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
            $(this.gridTableRef.nativeElement).find('thead').before(`
                <thead class='jexcel_label'>
                    <tr>
                        ${nestedHeaders}
                    </tr>
                </thead>
            `);
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
                this.valueChange.emit(this.cmpObjs);
            }
            else {
                this.validChange.emit(false);
            }
        }
        else {
            this.validChange.emit(false);
        }
    }

    buildTable() {
// this.buildTable();
            // let preservedData = [['', '']],
            //     colHeaders = ['name', 'desc'],
            //     columns: any[] = [
            //         {
            //             data: 0,
            //             type: 'text',
            //             width: 70,
            //         },
            //         {
            //             data: 1,
            //             type: 'text',
            //             width: 100,
            //         }
            //     ]
            // this.mss.forEach((ms, i) => {
            //     preservedData[0].push('', '');
            //     colHeaders.push(`${ms.MDL.meta.name}-output`, `${ms.MDL.meta.name}-variable`);
            //     columns.push(
            //         {
            //             data: i*2 + 1,
            //             type: 'text',
            //             width: 70,
            //         },
            //         {
            //             data: i*2 + 2,
            //             type: 'text',
            //             width: 70,
            //         }
            //     )
            // });
            // this.hotTable = new Handsontable(this.gridTableRef.nativeElement, {
            //     rowHeaders: true,
            //     width: '100%',
            //     autoWrapRow: true,
            //     autoRowSize: true,
            //     wordWrap: true,
            //     allowHtml: true,
            //     height: 487,
            //     minSpareRows: 1,
            //     manualRowResize: true,
            //     manualColumnResize: true,
            //     manualRowMove: true,
            //     manualColumnMove: true,
            //     nestedHeaders: (() => {
            //         let cols: any[] = [
            //             ['Comparison feature', 'Description'],
            //             ['', '']
            //         ];
            //         this.mss.forEach((ms, i) => {
            //             cols[0].push({ label: ms.MDL.meta.name, colspan: 2});
            //             cols[1].push('Output', 'Variable')
            //         });
            //         return cols;
            //     })(),
            //     colHeaders: colHeaders,
            //     data: preservedData,
            //     columns: columns,
            // });
            // const plugin = this.hotTable.getPlugin('autoRowSize');
            // console.log('plugin.isEnabled: ', plugin.isEnabled())

        // let self = this;
        // let option = {
        //     height: 'flex',
        //     width: 'flex',
        //     // fixedRowsTop: 1,
        //     // minSpareRows: 1,
        //     showTop: false,
        //     showHeader: true,
        //     stripeRows: true,
        //     columnBorders: true,
        //     rowBorders: true,
        //     resizable: true,
        //     numberCell: { show: true },
        //     dataModel: [],
        //     editable: this.mode === 'WRITE' ? true : false,
        //     colModel: function () {
        //         let cols = [
        //             {
        //                 title: 'Comparison feature',
        //                 dataType: 'string',
        //                 dataindx: 'name',
        //                 colModel: []
        //             },
        //             {
        //                 title: 'Description',
        //                 dataType: 'string',
        //                 dataindx: 'desc',
        //                 colModel: []
        //             },
        //         ];
        //         let msCols = this.ptMSs.map((ms, i) => {
        //             return {
        //                 title: ms.MDL.meta.name,
        //                 colModel: [
        //                     {
        //                         title: 'Output data',
        //                         editor: {
        //                             type: 'select',
        //                             options: ms.MDL.IO.outputs,
        //                             labelIndx: 'name',
        //                             valueIndx: 'id',
        //                         }
        //                     },
        //                     {
        //                         title: 'Output variable',
        //                         editor: {
        //                             type: 'select',
        //                             options: function (ui) {
        //                                 let rowData = ui.rowData,
        //                                     colIndx = ui.column.leftPos,
        //                                     rowIndx = $('#grid-table').pqGrid('getRowIndx', { rowData: rowData }),
        //                                     prevCell = $('#grid-table').pqGrid('getCell', {
        //                                         rowIndx: rowIndx,
        //                                         colIndx: colIndx - 1,
        //                                     });
        //                                 prevCell;
        //                                 return []
        //                             }
        //                         }
        //                     }
        //                 ]
        //             }
        //         })
        //         return _.concat(cols, msCols)
        //     },
        // };
        // this.gridTable = $('#grid-table').pqGrid(option)
        // this.gridTable.pgGrid('option', 'dataModel.data', data)
    }

}
