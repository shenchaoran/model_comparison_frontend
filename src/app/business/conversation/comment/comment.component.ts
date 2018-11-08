import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {
    Component,
    OnInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    forwardRef,
    ViewChild,
    ChangeDetectorRef,
    ElementRef,
    Inject,
} from '@angular/core';
import {
    Comment,
    User,
    CommentState,
} from '@models';
import {
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    FormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { get } from 'lodash';
import * as SimpleMDE from 'simplemde';
import { Simplemde } from 'ng2-simplemde';
import {
    ConversationService,
    UserService,
    TopicService,
    SolutionService,
    TaskService,
    MSRService,
} from '../../services';
import {
    Solution,
    Task,
    Topic,
    CalcuTask,
} from '../../models';

@Component({
    selector: 'ogms-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CommentComponent),
            multi: true
        }
    ],
})
export class CommentComponent implements ControlValueAccessor, OnInit, AfterViewInit {
    comment: Comment;
    author: User;
    doc: Solution | Task | Topic | CalcuTask;
    _originMD: string;

    get authorId() { return this.conversationService.authorId; }

    get user(): User { return this.userService.user; }

    get currentComment() {
        let i = get(this, 'comment.svid');
        return get(this, `comment.content[${i}]`);
    }
    editorConfig: SimpleMDE.Options;
    @ViewChild(Simplemde) simpleMDE: any;

    constructor(
        private conversationService: ConversationService,
        private userService: UserService,
        private cdRef: ChangeDetectorRef,
    ) {}

    ngOnInit() {}

    ngAfterViewInit() { }

    onSubmit() {
        this.currentComment.html = this.simpleMDE.simplemde.markdown(this.currentComment.md);
        this.currentComment.state = CommentState.READ;
        this.conversationService.upsertComment(this.comment).subscribe(res => {
            if (!res.error) {
            }
        })
    }

    onEdit() {
        this._originMD = this.currentComment.md;
        this.currentComment.state = CommentState.WRITE;
    }

    onCancel() {
        this.currentComment.md = this._originMD;
        this._originMD = '';
        if(this.comment !== this.conversationService.emptyComment$.value)
            this.currentComment.state = CommentState.READ;
    }

    onDelete() {
        this.conversationService.deleteComment(this.comment._id).subscribe(res => {

        });
    }

    onQuoteReply() {
        this.conversationService.quoteReplyComment(this.comment);
    }

    public writeValue(obj: any) {
        if (obj) {
            this.comment = obj;
            if(this.comment === this.conversationService.emptyComment$.value) {
                this.author = this.user;
            }
            else {
                this.author = this.conversationService.getAuthorOfComment(this.comment.from_uid);
            }
            this.cdRef.markForCheck();
        }
    }

    private propagateChange = (e: any) => { };

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched() { }
}
