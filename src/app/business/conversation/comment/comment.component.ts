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
import { Observable } from 'rxjs';
import {
    ConversationService,
    UserService
} from '../../services';
import * as SimpleMDE from 'simplemde';
import { Simplemde } from 'ng2-simplemde';

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
    user: User;

    get currentComment() {
        return this.comment.content[this.comment.svid];
    }
    editorConfig: SimpleMDE.Options;
    @ViewChild(Simplemde) simpleMDE: any;

    constructor(
        private conversationService: ConversationService,
        private userService: UserService,
        private cdRef: ChangeDetectorRef,
        @Inject('BACKEND') private backend,
    ) {
        this.editorConfig = {
            indentWithTabs: true,
            placeholder: 'some text',
            toolbar: [
                'bold',
                'italic',
                'heading',
                '|',
                'quote',
                'code',
                'unordered-list',
                'ordered-list',
                '|',
                'link',
                'image',
                '|',
                'preview',
                'side-by-side',
                'fullscreen',
                '|',
                'guide',
            ],
            toolbarTips: true,
            status: [
                'lines',
                'words',
                // 'cursor'
            ],
            styleSelectedText: true,
            spellChecker: false,
            tabSize: 4,

        };
    }

    ngOnInit() {
        this.user = this.userService.user;
    }

    ngAfterViewInit() {}

    onSubmit() {
        this.currentComment.html = this.simpleMDE.simplemde.markdown(this.currentComment.md);
        this.currentComment.state = CommentState.READ;
        let observer = {
            next: res => {
                if(!res) {

                }
                else {

                }
            }
        };
        if(this.comment.isEmpty) {
            this.conversationService.postComment()
                .subscribe(observer)
        }
        else {
            this.conversationService.updateComment(this.comment)
                .subscribe(observer)
        }
    }

    onEdit() {
        this.currentComment.state = CommentState.WRITE;
    }

    onCancel() {
        this.currentComment.state = CommentState.READ;
    }

    public writeValue(obj: any) {
        if (obj) {
            this.comment = obj;
            this.author = this.conversationService.getAuthorOfComment(this.comment.from_uid);
            // this.cdRef.markForCheck();
        }
    }

    private propagateChange = (e: any) => { };

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched() { }
}
