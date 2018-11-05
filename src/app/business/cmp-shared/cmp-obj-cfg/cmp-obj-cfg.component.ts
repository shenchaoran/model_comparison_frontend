import { Observable, Subject, from, of, combineLatest } from 'rxjs';
import { debounce, debounceTime, throttleTime, filter,} from 'rxjs/operators';
import { CmpMethodService } from '../../services/cmp-method.service';
import { cloneDeep, chain, map, find, get } from 'lodash';
import {
    Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange,
    ChangeDetectionStrategy,
    forwardRef,
    ViewChild,
    AfterViewInit,
    HostListener,
    Inject,
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
import { NgModelBase } from '../../../shared/classes';

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
    _dataReferOptions;

    _mode$: Subject<any> = new Subject();
    _mode: 'WRITE' | 'READ';
    cmpObjFG: FormGroup;
    displayedColumns = ['msName', 'eventName', 'field'];

    @Input() set mode(v) {
        this._mode$.next(v);
    };
    @Input() methods;
    @Input() participants;
    get methodsFG() { return this.cmpObjFG.get('methods'); }
    get cmpObj() { return this._innerValue; }

    constructor(
        private fb: FormBuilder,
    ) {
        super();
    }

    ngOnInit() {
        let stream = combineLatest(this._innerValue$, this._mode$);
        let read$ = stream.pipe(filter(v => v[1] === 'READ'));
        let write$ = stream.pipe(filter(v => v[1] === 'WRITE'));
        write$.subscribe(v => {
            this._mode = 'WRITE';
            this._dataReferOptions = map(this.participants as any[], ms => {
                return [
                    {
                        text: 'Input',
                        value: 'inputs',
                        children: this.getCasCaderData('inputs', ms)
                    },
                    {
                        text: 'Output',
                        value: 'outputs',
                        children: this.getCasCaderData('outputs', ms)
                    }
                ]
            });

            this.cmpObjFG = this.fb.group({
                id: this.cmpObj.id,
                name: [this.cmpObj.name, [Validators.required, Validators.minLength(1)]],
                desc: [this.cmpObj.desc, [Validators.required, Validators.minLength(2)]],
                dataRefers: this.fb.array(map(this.participants as any[], ms => {
                    let df = find(this.cmpObj.dataRefers, { msId: ms._id }) as any;
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
                methods: [map(this.cmpObj.methods as any[], v => v.id), [Validators.required]]
            });
            this.cmpObjFG.get('dataRefers').get('0').statusChanges.subscribe(state => {
                console.log('dataRefer state: ', state, this.cmpObjFG.get('dataRefers').get('0'));

            });
            this.cmpObjFG.get('dataRefers').get('0').valueChanges.subscribe(value => {
                console.log('dataRefer state: ', value, this.cmpObjFG.get('dataRefers').get('0'));

            });
            this.cmpObjFG.statusChanges.pipe(filter(v => v === 'VALID'), debounceTime(100), throttleTime(500)).subscribe(state => {
                this.cmpObj.name = this.cmpObjFG.value.name;
                this.cmpObj.desc = this.cmpObjFG.value.desc;
                this.cmpObj.dataRefers = map(this.cmpObjFG.value.dataRefers as any[], dataRefer => {
                    let ms = find(this.participants, { _id: dataRefer.msId }) as any;
                    let event = find(ms.MDL.IO[dataRefer.selected[0]], item => item.id === dataRefer.selected[1]);
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
                this.cmpObj.methods = map(this.cmpObjFG.value.methods as any[], methodId => {
                    let method = find(this.methods, { _id: methodId }) as any;
                    return method ? {
                        id: method._id,
                        name: method.meta.name
                    } : null;
                });
                return this.propagateChange(this.cmpObj);
            });
        });

        read$.subscribe(v => {
            this._mode = 'READ';

        })
    }

    private getCasCaderData(type, ms) {
        return map(ms.MDL.IO[type] as any[], event => {
            let schema = find(ms.MDL.IO.schemas, { id: event.schemaId });
            let cols = get(schema, 'structure.columns');
            let children = map(cols, col => {
                return {
                    text: (col as any).id,
                    value: (col as any).id
                };
            });
            return {
                text: event.name,
                value: event.id,
                children: children
            };
        });
    }
}
