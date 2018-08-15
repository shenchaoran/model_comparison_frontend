import { Observable, Subject, from, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmpMethodService } from '../../comparison/services/cmp-method.service';
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
import { ResourceSrc, CalcuTask, CmpTask, CmpSolution, CmpObj, DataRefer } from '@models';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
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
export class CmpObjCfgComponent implements OnInit {
    _formLoading;
    _methodLoading;
    _cmpObj;
    _participants;
    _dataReferCfgs;

    cmpMethods: any[];
    cmpObj$: Subject<any> = new Subject();
    participants$: Subject<any[]> = new Subject();
    cmpObjFG: FormGroup;

    @Input()
    set participants(v) {
        this.participants$.next(v)
    }

    constructor(
        private fb: FormBuilder,
        private cmpMethodService: CmpMethodService
    ) {
        combineLatest(this.cmpObj$, this.participants$)
            .subscribe(v => {
                this._cmpObj = v[0];
                this._participants = v[1];
                function getCasCaderData(type, ms) {
                    return _.map(ms.MDL.IO[type], event => {
                        return {
                            placeholder: 'Table column',
                            label: event.name,
                            value: event,
                            children: (()=> {
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
                })

                this.cmpObjFG = this.fb.group({
                    name: ['', [Validators.required, Validators.minLength(8)]],
                    desc: ['', [Validators.required, Validators.minLength(25)]],
                    dataRefers: this.fb.array(_.map(this._participants, ms => {
                        return this.fb.group({
                            msId: [ms._id, [Validators.required]],
                            msName: [ms.MDL.meta.name, [Validators.required]],
                            selected: [null, [Validators.required]]
                            // eventId: [null, [Validators.required]],
                            // eventName: [null, [Validators.required]],
                            // colId: [null, [Validators.required]]
                        });
                    })),
                    methods: this.fb.array([])
                })
            });
    }

    ngOnInit() {

    }

    queryMethod(schemaType) {
        this.cmpMethodService.findAllMatched({
            schemaType: schemaType
        })
            .subscribe(response => {
                if(!response.error) {
                    this.cmpMethods = response.doc
                }
            })
    }

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
