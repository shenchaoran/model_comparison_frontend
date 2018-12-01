import { Observable, Subject, from, of, combineLatest } from 'rxjs';
import { debounce, debounceTime, throttleTime, filter, } from 'rxjs/operators';
import { CmpMethodService } from '../../services/cmp-method.service';
import {
    Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange,
    ChangeDetectionStrategy,
    forwardRef,
    ViewChild,
    AfterViewInit,
    HostListener,
    Inject,
    ChangeDetectorRef,
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    FormArray,
    Validators,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { NgModelBase } from '@shared';

@Component({
    selector: 'ogms-cmp-obj-cfg',
    templateUrl: './cmp-obj-cfg.component.html',
    styleUrls: ['./cmp-obj-cfg.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CmpObjCfgComponent),
            multi: true
        }
    ],
})
export class CmpObjCfgComponent extends NgModelBase implements ControlValueAccessor, OnInit {
    _dfs;
    _dataReferOptions;
    _mode$: Subject<any> = new Subject();
    _mode: 'WRITE' | 'READ' = 'READ';
    _participants;
    cmpObjFG: FormGroup;
    displayedColumns = ['msName', 'eventName', 'field'];
    hasSubRegion;

    @Input() set mode(v) {
        // console.log('cmpObj mode:', v)
        this._mode$.next(v);
    };
    @Input() methods;
    @Input() 
    set participants(v) {
        this._participants = v;
        function getCasCaderData(type, ms) {
            return _.map(ms.MDL.IO[type] as any[], event => {
                let schema = _.find(ms.MDL.IO.schemas, { id: event.schemaId });
                let schemaType = _.get(schema, 'structure.type')
                if( schemaType === 'table') {
                    let cols = _.get(schema, 'structure.columns');
                    return {
                        text: event.name,
                        value: event.id,
                        children: _.map(cols, col => {
                            return {
                                text: (col as any).id,
                                value: (col as any).id
                            };
                        })
                    };
                }
                else if(schemaType === 'NETCDF4') {
                    let variables = _.chain(schema).get('structure.variables').keys().value()
                    return {
                        text: event.name,
                        value: event.id,
                        children: _.map(variables, variable => {
                            return {
                                text: (variable as any).id,
                                value: (variable as any).id
                            };
                        })
                    };
                }
                else {
                    return {
                        text: event.name,
                        value: event.id,
                    }
                }
            });
        }
        this._dataReferOptions = _.map(this.participants as any[], ms => {
            return [
                {
                    text: 'Input',
                    value: 'inputs',
                    children: getCasCaderData('inputs', ms)
                },
                {
                    text: 'Output',
                    value: 'outputs',
                    children: getCasCaderData('outputs', ms)
                }
            ]
        });
    }
    get participants() { return this._participants; }
    get methodsFG() { return this.cmpObjFG.get('methods'); }
    get cmpObj() { return this._innerValue; }

    constructor(
        private fb: FormBuilder,
        private cdRef: ChangeDetectorRef,
    ) {
        super();
        this._innerValue$.subscribe(v => {
            this._innerValue = v;
        });
        let stream = combineLatest(this._innerValue$, this._mode$);
        let read$ = stream.pipe(filter(v => v[1] === 'READ'));
        let write$ = stream.pipe(filter(v => v[1] === 'WRITE'));
        this._mode$.pipe(filter(v => v === 'WRITE')).subscribe(v => {
            this.initWriteMode();
        });
        write$.subscribe(v => {
            this.initWriteMode();
        });

        read$.subscribe(v => {
            this._mode = 'READ';
        });
    }

    ngOnInit() {}

    // onDFChange(dfs, i) {
    //     let ctrl = this.cmpObjFG.get(`dataRefers.${i}.selected`);
        // ctrl.setValue = dfs;
        // ctrl.updateValueAndValidity();
        // this.cdRef.markForCheck();
    // }

    private initWriteMode() {
        if (this.cmpObj) {
            this._mode = 'WRITE';

            this._dfs = _.map(this.participants as any[], ms => {
                let df = _.find(this.cmpObj.dataRefers, { msId: ms._id }) as any;
                let selectedCasOpts = [];
                df && (selectedCasOpts = [
                    df.eventType,
                    df.eventId,
                    df.field
                ]);
                return selectedCasOpts;
            })
            this.cmpObjFG = this.fb.group({
                id: this.cmpObj.id,
                name: [this.cmpObj.name, [Validators.required, Validators.minLength(1)]],
                desc: [this.cmpObj.desc, [Validators.required, Validators.minLength(2)]],
                dataRefers: this.fb.array(_.map(this.participants as any[], ms => {
                    let df = _.find(this.cmpObj.dataRefers, { msId: ms._id }) as any;
                    let selectedCasOpts = [];
                    df && (selectedCasOpts = [
                        df.eventType,
                        df.eventId,
                        df.field
                    ]);
                    // console.log(selectedCasOpts);
                    return this.fb.group({
                        msId: ms._id,
                        msName: ms.MDL.meta.name,
                        selected: [selectedCasOpts, [Validators.required]]
                    });
                })),
                methods: [[], [Validators.required]]
            });
            // this.cmpObjFG.valueChanges.subscribe(v => {
            //     console.log('cmpObj changed');
            // })
            this.cmpObjFG.statusChanges.pipe(filter(v => v === 'VALID'), debounceTime(100), throttleTime(500)).subscribe(state => {
                // console.log('cmpObj changed');
                this.cmpObj.name = this.cmpObjFG.value.name;
                this.cmpObj.desc = this.cmpObjFG.value.desc;
                this.cmpObj.dataRefers = _.map(this.cmpObjFG.value.dataRefers as any[], dataRefer => {
                    let ms = _.find(this.participants, { _id: dataRefer.msId }) as any;
                    let event = _.find(ms.MDL.IO[dataRefer.selected[0]], item => item.id === dataRefer.selected[1]);
                    return {
                        msId: dataRefer.msId,
                        msName: dataRefer.msName,
                        eventType: dataRefer.selected[0],
                        eventId: dataRefer.selected[1],
                        field: dataRefer.selected[2],
                        eventName: event.name,
                        schemaId: event.schemaId
                    };
                });
                let methodsCtrl = this.cmpObjFG.get('methods')
                this.cmpObj.methods = methodsCtrl.value;
                // this.cmpObj.methods = _.map(this.cmpObjFG.value.methods as any[], methodId => {
                //     let method = _.find(this.methods, { _id: methodId }) as any;
                //     return method ? {
                //         id: method._id,
                //         name: method.meta.name
                //     } : null;
                // });
                return this.propagateChange(this.cmpObj);
            });
        }
    }

    addCmpMethod(method) {
        method.selected = !method.selected;
        let methodsCtrl = this.cmpObjFG.get('methods')
        if(method.selected) {
            methodsCtrl.value.push({id: method._id, name: method.meta.name});
        }
        else {
            _.remove(methodsCtrl.value, {id: method._id})
        }
        this.hasSubRegion = !!_.find(methodsCtrl.value, method => {
            return method.name === 'Sub-region bias contour map' || method.name === 'Heat map' || method.name === 'Sub-region line chart'
        })
        this.cmpObj.methods = methodsCtrl.value;
    }

    onRegionsChange(regions) {
        // console.log(regions)
        this.cmpObj.regions = regions;
    }
}
