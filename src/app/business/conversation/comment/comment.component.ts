import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    forwardRef,
    ViewChild
} from '@angular/core';
import { Comment } from '@models';
import {
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    FormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Observable } from 'rxjs';
import {
    ConversationService,
    UserService
} from '../../services';

@Component({
    selector: 'ogms-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CommentComponent),
            multi: true
        }
    ],
})
export class CommentComponent implements ControlValueAccessor, OnInit {
    _comment: Comment;

    constructor(
        private service: ConversationService,
        private userService: UserService
    ) { }

    ngOnInit() {
    }

    
    public writeValue(obj: any) {
        if(obj) {
            this._comment = obj;
        }
    }
    
    private propagateChange = (e: any) => {};
    
    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}
}
