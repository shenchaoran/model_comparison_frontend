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
    EventEmitter,
    Optional,
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
    ]
})
export class FormKeynoteComponent implements OnInit {
    @Input() mode: 'write' | 'read' = 'read';
    @Output() onKeynoteChange = new EventEmitter<any>();
    @Input() keynote: {
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

    constructor(
        private route: ActivatedRoute,
        private modelService: MSService
    ) {}

    ngOnInit() {}

    emitNgModelChange() {
        // this.propagateChange(this.keynote);
        this.onKeynoteChange.emit(this.keynote);
    }

    // 设置初始值
    // public writeValue(obj: any) {
    //     // if(obj) {
    //     //     this.keynote = obj;
    //     // }
    // }

    // 当表单控件值改变时，函数 fn 会被调用
    // 这也是我们把变化 emit 回表单的机制
    // public registerOnChange(fn: any) {
    //     this.propagateChange = fn;
    // }

    // public registerOnTouched() {}
}