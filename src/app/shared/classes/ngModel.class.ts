import { ControlValueAccessor, FormControl, Validator } from '@angular/forms';
import { Subject } from 'rxjs';

export class NgModelBase implements ControlValueAccessor {
    public propagateChange = (v: any) => { };
    public _innerValue: any;
    public _innerValue$: Subject<any> = new Subject();


    public set value(v: any) {
        if (v !== this._innerValue) {
            this._innerValue = v;
        }
    }

    public get value(): any {
        return this._innerValue;
    }

    public writeValue(v: any) {
        if (v !== this._innerValue) {
            this._innerValue = v;
            this._innerValue$.next(v);
        }
    }

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched(fn: any) {
        this.propagateChange = fn;
    }
}
