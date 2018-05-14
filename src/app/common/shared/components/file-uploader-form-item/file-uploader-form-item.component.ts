
import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    forwardRef,
    Input,
    Output,
    ViewChild,
    EventEmitter
} from '@angular/core';
import {
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    FormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
    selector: 'ogms-file-uploader-form-item',
    templateUrl: './file-uploader-form-item.component.html',
    styleUrls: ['./file-uploader-form-item.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileUploaderFormItemComponent),
            multi: true
        }
        // {
        //     provide: NG_VALIDATORS,
        //     useExisting: forwardRef(() => FileUploaderFormItemComponent),
        //     multi: true
        // }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderFormItemComponent implements OnInit {
    // ngModel 的值是一个后台返回的id
    v;

    @Input() width;
    @Input() label;
    @Input() fileUploaderOptions;
    // @Output() onFileUploadCompleted = new EventEmitter<any>();
    // @Output() onClear = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    emitChange(res) {
        if(res) {
            if(res.error) {
                this.v = undefined;
            }
            else {
                this.v = res.data._id;
            }
        }
        else {
            this.v = undefined;
        }

        this.propagateChange(this.v);
    }

    private propagateChange = (e: any) => {};

    public writeValue(obj: any) {
        if(obj) {
            this.v = obj;
        }
    }
    
    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched(fn: any) {}
}
