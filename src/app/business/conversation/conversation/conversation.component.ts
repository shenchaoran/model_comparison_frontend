import { 
    Component, 
    OnInit, 
    Input, 
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Output,
    EventEmitter,
    forwardRef,
    ViewChild,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    FormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { 
    fromJS,
} from 'immutable';
import {
    Observable,
    Subject,
    combineLatest
} from 'rxjs';

import { 
    Conversation, 
    CommentType,
    Comment
} from '@models';
import {
    ConversationService,
    UserService,
    TopicService,
} from '@services';

// 二选一，根据 _id 或者 ngModel 初始化该组件
@Component({
    selector: 'ogms-conversation',
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ConversationComponent),
            multi: true
        }
    ],
})
export class ConversationComponent implements ControlValueAccessor, OnInit {
    conversation: Conversation;
    emptyComment: Comment;
    conversation$: Subject<any> = new Subject();
    
    @Input() set _id(v: string) {
        this.conversationService.findOne(v)
            .subscribe(res => {
                if(res.error) {

                }
                else {
                    this.conversation$.next(res.data);
                }
            });
    }

    constructor(
        public conversationService: ConversationService,
        private userService: UserService,
        private cdRef: ChangeDetectorRef,
    ) {
        this.conversationService.emptyComment$.subscribe(v => {
            this.emptyComment = v;
            this.cdRef.markForCheck();
        });
        this.conversation$.subscribe(v => {
            this.conversation = v;
            this.cdRef.markForCheck();
        })
    }

    onCommentChange(comment) {

    }

    ngOnInit() {
    }

    public writeValue(obj: any) {
        if(obj) {
            this.conversation$.next(obj);
        }
    }
    
    private propagateChange = (e: any) => {};
    
    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}
}
