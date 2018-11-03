import { ControlValueAccessor, FormControl, Validator } from '@angular/forms';
import { Subject } from 'rxjs';

export class NgModelBase implements ControlValueAccessor, Validator {
    public propagateChange = (v: any) => { }
    public _innerValue: any;
    public _innerValue$: Subject<any> = new Subject();


    set value(v: any) {
        if (v !== this._innerValue) {
            this._innerValue = v
            this.propagateChange(v)
        }
    }

    get value(): any {
        return this._innerValue
    }

    public validate(c: FormControl) {
        return null;
    }

    writeValue(v: any) {
        if (v !== this._innerValue) {
            this._innerValue = v;
            this._innerValue$.next(v);
        }
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn
    }

    registerOnTouched(fn: any) {
        this.propagateChange = fn
    }
}
