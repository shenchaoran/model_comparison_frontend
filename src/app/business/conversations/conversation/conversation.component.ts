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
import { NgModelBase } from '@shared';

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
export class ConversationComponent extends NgModelBase implements OnInit {
    get conversation(): Conversation { return this._innerValue; }
    set conversation(v: Conversation) { this._innerValue = v; }
    emptyComment: Comment;
    _innerValue$: Subject<any> = new Subject();

    @Input() set _id(v: string) {
        this.conversationService.findOne(v).subscribe(res => {
            if (!res.error) {
                this._innerValue$.next(res.data);
            }
        });
    }

    constructor(
        public conversationService: ConversationService,
        private cdRef: ChangeDetectorRef,
    ) {
        super();
        this.conversationService.emptyComment$.subscribe(v => {
            this.emptyComment = v;
            // this.cdRef.markForCheck();
        });
        this._innerValue$.subscribe(v => {
            this.conversation = v;
            // this.cdRef.markForCheck();
        })
    }

    onCommentChange(comment) { }

    ngOnInit() { }
}
