// 创建一个cmpObj
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResourceSrc, CalcuTask, CmpTask, CmpSolution, CmpObj, DataRefer } from '@models';

@Component({
    selector: 'ogms-cmp-obj-cfg',
    templateUrl: './cmp-obj-cfg.component.html',
    styleUrls: ['./cmp-obj-cfg.component.scss']
})
export class CmpObjCfgComponent implements OnInit {
    dataRefers: DataRefer[] = [];
    _msInstances: CalcuTask[];

    validSchema: boolean = true;
    schemaId: string;
    methods: any[];

    @Input()
    set msInstances(v) {
        _.map(v, msInstance => {
            this.patchEventChildren(msInstance);
            this.dataRefers.push({
                msId: msInstance.msId,
                msName: msInstance.msName,
                eventName: '',
                dataId: '',
                schemaId: ''
            });
        });
        this._msInstances = v;
    }
    @Input() cmpObj: CmpObj;
    @Output() onCmpObjChange = new EventEmitter<any>();
    @Output() onCmpObjCompleted = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    patchEventChildren(msInstance) {
        if (!msInstance.options) {
            msInstance.options = [];
        }
        _
            .chain(msInstance.IO.data)
            .filter(event => event.type !== 'parameter')
            .map(event => {
                const opt = {
                    label: event.id,
                    value: event.id,
                    children: undefined,
                    isLeaf: undefined
                };
                msInstance.options.push(opt);
                if (event.schema.structure.type === 'table') {
                    opt.children = [];
                    _.map(event.schema.structure.columns, col => {
                        opt.children.push({
                            label: col.id,
                            value: col.id,
                            isLeaf: true
                        });
                    });
                }
                else {
                    opt.isLeaf = true;
                }
            })
            .value();
    }

    onDataReferChange(v, msInstance, dataRefer) {
        // console.log(v);
        if (v.length) {
            dataRefer.eventName = v[0];
            _.map(msInstance.IO.data, event => {
                if (v[0] === event.id) {
                    dataRefer.schemaId = event.schema.id;
                }
            });

            if (v.length === 2) {
                dataRefer.field = v[1];
                dataRefer.schemaId = 'table column';
            }
        }

        this.validSchema = _
            .chain(this.dataRefers)
            .filter(dataRefer => (dataRefer.schemaId !== '' && dataRefer.schemaId !== undefined))
            .map((dataRefer, i) => {
                if(i === 0) {
                    this.schemaId = dataRefer.schemaId;
                }
                return dataRefer;
            })
            .every(dataRefer => dataRefer.schemaId === this.schemaId)
            .value();

        if (this.validSchema) {
            this.cmpObj.schemaId = this.schemaId;
            this.cmpObj.dataRefers = this.dataRefers;
            if (this.schemaId === 'table column') {
                this.methods = [
                    {
                        label: 'Chart',
                        value: 'TABLE_CHART',
                        checked: false
                    },
                    {
                        label: 'Statistic',
                        value: 'TABLE_STATISTIC',
                        checked: false
                    }
                ]
            }
            else if (this.schemaId === 'ASCII_GRID_RAW' || this.schemaId === 'ASCII_GRID_RAW_BATCH') {
                this.methods = [
                    {
                        label: 'Map preview',
                        value: 'Visualization',
                        checked: false
                    }
                ];
            }
        }
        else {
            this.methods = [];
        }
    }

    onMethodChange() {
        this.cmpObj.methods = _
            .chain(this.methods)
            .filter(method => method.checked)
            .map(method => {
                return {
                    label: method.label,
                    value: method.value
                };
            })
            .value();
    }
}
