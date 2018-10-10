import {
    Component, OnInit, Input, Output, 
    ChangeDetectionStrategy,
    forwardRef,
} from '@angular/core';
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
    selector: 'ogms-cmp-method-cfg',
    templateUrl: './cmp-method-cfg.component.html',
    styleUrls: ['./cmp-method-cfg.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CmpMethodCfgComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmpMethodCfgComponent implements OnInit {

    @Input() method: any;

    constructor() { }

    ngOnInit() {
    }

}
