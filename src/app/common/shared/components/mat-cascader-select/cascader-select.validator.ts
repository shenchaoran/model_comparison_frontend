import { Validator, AbstractControl, FormControl, NG_VALIDATORS } from "@angular/forms";
import { Directive, forwardRef } from '@angular/core';

@Directive({
    selector: '[formControl],[ngModel]',
    providers: [
        { 
            provide: NG_VALIDATORS, 
            useExisting: forwardRef(() => CascaderSelectValidator), 
            multi: true 
        }
    ]
})
export class CascaderSelectValidator implements Validator {
    constructor() {}

    validate(ctrl: AbstractControl):{[key: string]: any} {
        if(ctrl.value) {
            return null;
        }
        else {
            return {
                validValue: 'invalid selection!'
            };
        }
    }

}
