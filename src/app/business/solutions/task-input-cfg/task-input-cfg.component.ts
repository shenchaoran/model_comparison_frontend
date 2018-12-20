import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, Inject, HostListener, OnDestroy, ViewChild, ChangeDetectorRef, Renderer2, ElementRef, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ConversationService, SolutionService, UserService, MSService } from "@services";
import { Solution, Task, Topic, MS, CmpMethod, CmpObj, UDXSchema, CalcuTask, STDData, } from "@models";
import * as ObjectId from 'objectid';
import * as uuidv1 from 'uuid/v1';

@Component({
    selector: 'ogms-task-input-cfg',
    templateUrl: './task-input-cfg.component.html',
    styleUrls: ['./task-input-cfg.component.scss']
})
export class TaskInputCfgComponent implements OnInit, AfterViewInit {
    @Input() showOutput: boolean = false;
    @Input() stds: STDData[];
    @Input() useSTD: boolean = true;
    @Input() mode: 'READ' | 'WRITE' = 'READ';
    @Input() calcuTasks: CalcuTask[];
    @Output() valueChange = new EventEmitter<{
        value?: CalcuTask[],
        valid: boolean,
    }>();
    @ViewChild('gridTable') gridTableRef: ElementRef;

    stdEventNames
    rowIndexColWidth = 30;
    eventNameWidth = 200;
    msColWidth = 200;
    colHeaders;
    colWidths = [this.eventNameWidth];
    colAlignments = ['left'];
    data = [];
    columns: any[];

    targetId;

    constructor(
        @Inject('API') private api,
    ) {
        this.targetId = uuidv1();
    }

    ngOnInit() {
        this.colHeaders = this.showOutput ? ['Inputs & Outputs'] : ['Inputs'];
        this.columns = [{ type: 'text', readOnly: this.mode === 'READ'? false: true, wordWrap: true, }];
        // the first column value
        this.stdEventNames = new Set();
        this.calcuTasks.forEach((calcuTask, i) => {
            for (let key in calcuTask.IO) {
                if (
                    (this.showOutput && key === 'outputs') ||
                    (this.useSTD && key === 'std') ||
                    (!this.useSTD && key === 'inputs') ||
                    key === 'parameters'
                ) {
                    calcuTask.IO[key].forEach(event => {
                        // 坐标在选择站点时配置
                        if(event.stdName !== 'coordinate') 
                            this.stdEventNames.add(event.stdName);
                    })
                }
            }
        });

        // other columns
        this.calcuTasks.forEach((calcuTask, i) => {
            this.colHeaders.push(`${calcuTask.msName}`);
            this.colAlignments.push('center');
            this.colWidths.push(this.msColWidth);

            if (this.mode === 'WRITE') {
                this.columns.push({
                    type: 'dropdown',
                    wordWrap: true,
                    source: _.concat(
                        this.stds.map(std => {
                        return {
                            id: std._id,
                            name: std.meta.name,
                        }
                    }), {
                            id: '-',
                            name: '-',
                        }),
                })
            }
            else if (this.mode === 'READ') {
                this.columns.push({
                    type: 'text',
                    wordWrap: true,
                })
            }
        })
        this.stdEventNames.forEach((stdEventName, i) => {
            let row = [stdEventName];
            this.calcuTasks.forEach((calcuTask, j) => {
                let matchedEvent = null;
                for (let key in calcuTask.IO) {
                    if (
                        (this.useSTD && key === 'std') || 
                        (!this.useSTD && key === 'inputs') || 
                        key === 'parameters' ||
                        (this.showOutput && key === 'outputs')
                    ) {
                        matchedEvent = _.find(calcuTask.IO[key], event => event.stdName === stdEventName);
                        if(!!matchedEvent)
                            break;
                    }
                }
                if (this.mode === 'WRITE') {
                    row.push(!matchedEvent? '-': '')
                }
                else if (this.mode === 'READ') {
                    let cellData
                    if(!matchedEvent) {
                        cellData = '-'
                    }
                    else {
                        let downloadUrl = `${this.api.backend}/data/download?msrId=${calcuTask._id}&eventId=${matchedEvent.id}`
                        let label = matchedEvent.fname? matchedEvent.fname: matchedEvent.name;
                        cellData = `<a href='${downloadUrl}' target='_blank'>${label}</a>`
                    }
                    row.push(cellData);
                }
            })
            this.data.push(row);
        })
    }

    ngAfterViewInit() {
        setTimeout(() => {
            $(this.gridTableRef.nativeElement).jexcel({
                contextMenu: () => {
                    event.stopPropagation();
                    event.preventDefault();
                    return false;
                },
                allowInsertRow: false,
                allowInsertColumn: false,
                allowDeleteColumn: false,
                allowDeleteRow: false,
                tableHeight: '500px',
                tableOverflow: true,
                colHeaders: this.colHeaders,
                colWidths: this.colWidths,
                colAlignments: this.colAlignments,
                columns: this.columns,
                data: this.data,
                minSpareRows: 0,
                editable: this.mode === 'WRITE' ? true : false,
                onchange: (instance, cell, value) => {

                    // if(value === '-')
                    //     return;
                    // let cellName = $(instance).jexcel('getColumnNameFromId', $(cell).prop('id'));
                    // let colIndex = cellName[0].charCodeAt() - 'A'.charCodeAt(0);
                    // if(colIndex > 1 && colIndex%2 === 0) {
                    //     let variableCell = `${String.fromCharCode(colIndex + 1 + 'A'.charCodeAt(0))}${cellName[1]}`
                    //     $(instance).jexcel('setValue', variableCell, '')
                    // }
                },
                onbeforechange: (instance, cell, value) => {
                    if (value === '-') {
                        // $(cell).addClass('readonly')
                        // event.preventDefault();
                        // event.stopPropagation();
                        // return false;
                    }
                },
                onafterchange: () => this.validate(),
            });
            this.validate();
            for (let i = 0; i < this.data.length; i++) {
                for (let j = 0; j < this.data[i].length; j++) {
                    if (this.data[i][j] === '-') {
                        let col = String.fromCharCode(j + 'A'.charCodeAt(0));
                        let cellIndex = `${col}${i + 1}`;
                        let cell = $(this.gridTableRef.nativeElement).jexcel('getCell', cellIndex);
                        $(cell).addClass('readonly');
                    }
                }
            }
        }, 10);
    }

    validate() {
        let table = $(this.gridTableRef.nativeElement).jexcel('getData', false);
        let valid = true;
        for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < table[i].length; j++) {
                let cellData = table[i][j];
                if (!cellData) {
                    valid = false;
                    return this.valueChange.emit({ valid: false })
                }
                if (j !== 0 && cellData !== '-') {
                    for (let key in this.calcuTasks[j - 1].IO) {
                        if (
                            (this.useSTD && key === 'std') ||
                            (!this.useSTD && key === 'inputs')
                        ) {
                            this.calcuTasks[j - 1].IO[key].forEach(event => {
                                if (event.stdName === table[i][0]) {
                                    event.value = cellData
                                }
                            })
                        }
                    }
                }
            }
        }
        this.valueChange.emit({
            value: this.calcuTasks,
            valid: true,
        });
    }
}
