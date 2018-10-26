import { Observable, Subject, from, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmpMethodService } from '../../services/cmp-method.service';
import { CasCaderData } from '@shared';
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmpObjCfgComponent implements ControlValueAccessor, OnInit {
    _formLoading;
    _methodLoading = true;
    _cmpObj;
    _participants;
    _dataReferCfgs;
    _cmpMethods;

    cmpMethods$: Subject<any[]> = new Subject();
    cmpObj$: Subject<any> = new Subject();
    participants$: Subject<any[]> = new Subject();

    cmpObjFG: FormGroup;

    @Input()
    set methods(v) {
        this.cmpMethods$.next(v);
    }
    @Input()
    set participants(v) {
        this.participants$.next(_.cloneDeep(v))
    }
    get methodsFG() {
        return this.cmpObjFG.get('methods');
    }

    constructor(
        private fb: FormBuilder,
        private cmpMethodService: CmpMethodService
    ) {
        combineLatest(this.cmpObj$, this.participants$, this.cmpMethods$)
            .subscribe(v => {
                this._cmpObj = v[0];
                this._participants = v[1];
                this._cmpMethods = v[2];
                function getCasCaderData(type, ms) {
                    return _.map(ms.MDL.IO[type], event => {
                        return {
                            placeholder: 'Table column',
                            label: event.name,
                            value: event,
                            children: (() => {
                                let targetSchema = _.chain(ms.MDL.IO.schemas)
                                    .find(schema => schema.id = event.schemaId)
                                    .value();
                                return _.map(targetSchema.structure.columns, col => {
                                    return {
                                        label: col.id,
                                        value: col.id
                                    }
                                })
                            })()
                        }
                    });
                }
                this._dataReferCfgs = _.map(this._participants, ms => {
                    let cfg: CasCaderData = {
                        placeholder: 'Data type',
                        children: [
                            {
                                placeholder: 'Data item',
                                label: 'Input',
                                value: 'inputs',
                                children: getCasCaderData('inputs', ms)
                            },
                            {
                                placeholder: 'Data item',
                                label: 'Output',
                                value: 'outputs',
                                children: getCasCaderData('outputs', ms)
                            }
                        ]
                    };
                    return cfg;
                });

                this.cmpObjFG = this.fb.group({
                    id: this._cmpObj.id,
                    name: ['', [Validators.required, Validators.minLength(1)]],
                    desc: ['', [Validators.required, Validators.minLength(2)]],
                    dataRefers: this.fb.array(_.map(this._participants, ms => {
                        return this.fb.group({
                            msId: ms._id,
                            msName: ms.MDL.meta.name,
                            selected: [[], [Validators.required]]
                        });
                    })),
                    methods: [null, [Validators.required]]
                });

                this.cmpObjFG.statusChanges.subscribe(state => {
                    console.log(state);
                    if (state === 'VALID') {
                        return this.propagateChange(this.cmpObjFG.value);
                    }
                })
            });
    }

    ngOnInit() {

    }

    onSelected(e) { }

    private propagateChange = (e: any) => { };

    public writeValue(obj: any) {
        if (!obj) {
            obj = {}
        }
        this.cmpObj$.next(obj);
    }

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched(fn: any) { }
}
