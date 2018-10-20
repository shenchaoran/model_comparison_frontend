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
declare let Quill: any;

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
export class CommentComponent implements ControlValueAccessor, OnInit, AfterViewInit {
    comment: Comment;
    author: User;
    user: User;
    editor;
    @ViewChild('editorDOM') editorDOM: ElementRef;

    constructor(
        private conversationService: ConversationService,
        private userService: UserService,
        private cdRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.user = this.userService.user;
    }

    ngAfterViewInit() {
        this.editor = new Quill(this.editorDOM.nativeElement, {
            modules: {
                toolbar: true
            },
            placeholder: 'Compose an epic...',
            theme: 'snow'
        })
    }

    onSubmit() {
        // var v = this.editor.getContents();
        this.comment.content[this.comment.svid].value = this.editor.container.firstChild.innerHTML;
        this.comment.content[this.comment.svid].state = CommentState.READ;
    }

    public writeValue(obj: any) {
        if (obj) {
            this.comment = obj;
            this.author = this.conversationService.getUserOfComment(this.comment.from_uid);
            this.cdRef.markForCheck();
        }
    }

    private propagateChange = (e: any) => { };

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched() { }
}
