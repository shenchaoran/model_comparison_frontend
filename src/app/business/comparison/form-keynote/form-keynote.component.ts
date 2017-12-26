/**
 * 支持双向绑定的自定义表单控件
 */

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
import { ActivatedRoute } from '@angular/router';
import {
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    FormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {
    MSService
} from '../../geo-model/services';

@Component({
    selector: 'ogms-form-keynote',
    templateUrl: './form-keynote.component.html',
    styleUrls: ['./form-keynote.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormKeynoteComponent),
            multi: true
        }
        // {
        //     provide: NG_VALIDATORS,
        //     useExisting: forwardRef(() => FormKeynoteComponent),
        //     multi: true
        // }
    ]
})
export class FormKeynoteComponent implements ControlValueAccessor, OnInit {
    keynote: {
        direction: 'x' | 'y',
        dimension: 'point' | 'polygon' | 'multi-point',
        attached: {
            solutionMeta: {
                name: string,
                desc: string
            }
        }
    } = {
        direction: undefined, 
        dimension: undefined,
        attached: {
            solutionMeta: {
                name: '',
                desc: ''
            }
        }
    };

    selectMode: string;
    // selectedMss: Array<{}>;

    // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中，即 (ngModelChange) 中绑定的函数
    // 由框架注册，然后我们使用它把变化发回表单
    // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
    private propagateChange = (e: any) => {};

    constructor(
        private route: ActivatedRoute,
        private modelService: MSService
    ) {}

    ngOnInit() {
        
    }

    emitNgModelChange() {
        this.propagateChange(this.keynote);
    }

    // 设置初始值
    public writeValue(obj: any) {
        // if(obj) {
        //     this.keynote = obj;
        // }
    }

    // 当表单控件值改变时，函数 fn 会被调用
    // 这也是我们把变化 emit 回表单的机制
    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}
}