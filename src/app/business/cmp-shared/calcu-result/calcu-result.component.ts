import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    forwardRef,
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
    selector: 'ogms-calcu-result',
    templateUrl: './calcu-result.component.html',
    styleUrls: ['./calcu-result.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CalcuResultComponent),
            multi: true
        }
    ]
})
export class CalcuResultComponent implements OnInit, ControlValueAccessor {
    msInstance;
    onMSInstanceChange = new EventEmitter<any>();

    constructor() { }

    // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中，即 (ngModelChange) 中绑定的函数
    // 由框架注册，然后我们使用它把变化发回表单
    // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
    private propagateChange = (e: any) => { };

    ngOnInit() {
    }

    // 设置初始值
    public writeValue(obj: any) {
        if (obj) {
            this.msInstance = obj;
        }
    }

    // 当表单控件值改变时，函数 fn 会被调用
    // 这也是我们把变化 emit 回表单的机制
    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    // 这里没有使用，用于注册 touched 状态
    public registerOnTouched() { }
}
