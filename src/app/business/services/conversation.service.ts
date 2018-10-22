import { Injectable } from '@angular/core';
import {
    Router,
    NavigationEnd,
} from '@angular/router';
import { ListBaseService } from './list-base.service';
import { UserService } from './user.service';
import { _HttpClient } from '../../common/core/services';
import {
    Conversation,
    CommentType,
    Comment
} from '@models/conversation.class';
import { User } from '../models/user.class';
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

var counter = 1;
@Injectable({
    providedIn: 'root',
})
export class ConversationService extends ListBaseService {
    protected baseUrl = '/conversations';

    private hadSavedConversation: boolean = false;
    public pageIndex: number = 1;
    public pageSize: number = 20;
    public commentCount: number;
    public conversation: Conversation;             // 一个服务实例围绕着 conversation 对象做一系列处理
    public users: User[];                          // 和 conversation 相关的用户信息，每次查找用户时，从这里查，避免从数据库重复获取
    public emptyComment$: BehaviorSubject<Comment>;

    constructor(
        protected http: _HttpClient,
        private userService: UserService,
        private router: Router,
    ) {
        super(http);
        console.log('\n******** ConversationService constructor ', counter++);
        this.users = [this.userService.user];
        this.commentCount = 0;
        this.conversation = null;
        this.newEmptyComment();
    }

    public init(conversation: Conversation) {
        this.conversation = conversation;
        this.hadSavedConversation = true;
    }

    public createConversation(pid: string) {
        this.conversation = new Conversation(this.userService.user, pid);
        this.conversation.comments = [];
        this.commentCount = 0;
        this.hadSavedConversation = false;
        return this.conversation;
    }

    public findOne(id, withRequestProgress?) {
        return super.findOne(id, withRequestProgress).pipe(map(res => {
            if (!res.error) {
                this.commentCount = res.data.commentCount;
                this.conversation = res.data.conversation;
                this.conversation.comments = res.data.comments;
                // this.comments = res.data.comments;
                this.users = res.data.users;
                return res;
            }
            return res;
        }));
    }

    public getCommentsByPage(pageIndex: number, pageSize: number) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.http.get(`${this.baseUrl}/${this.conversation._id}/comments`, {
            params: {
                pageIndex,
                pageSize
            }
        }).pipe(map(res => {
            if (res.error) {

            }
            else {
                this.commentCount = res.data.count;
                this.conversation.comments = res.data.docs;
                return res;
            }
        }))
    }

    public postComment() {
        this.emptyComment$.value.isEmpty = false;
        return this.http.post(`${this.baseUrl}/${this.conversation._id}/comments`, {
            comment: this.emptyComment$.value,
            conversation: this.hadSavedConversation ? null : this.conversation
        }).pipe(map(res => {
            if (!res.error && res.data === true) {
                this.conversation.comments.push(this.emptyComment$.value);
                this.commentCount++;
                this.newEmptyComment();
                // if(!this.users.find(v => v._id === this.userService.user._id)) 
                //     this.users.push(this.userService.user);
                if (!this.hadSavedConversation)
                    this.hadSavedConversation = true;
                return res;
            }
            return res;
        }))
    }

    /**
     * 
     */
    public updateComment(comment: Comment) {
        return this.http.patch(`${this.baseUrl}/${this.conversation._id}/comments/${comment._id}`, comment).pipe(map(res => {
            if (!res.error) {
                let index = this.conversation.comments.findIndex(v => v._id === comment._id);
                this.conversation.comments[index] = comment;
            }
            return res;
        }))
    }

    public deleteComment(commentId: String) {
        let commentIndex = this.conversation.comments.findIndex(v => v._id === commentId);
        return this.http.delete(`${this.baseUrl}/${this.conversation._id}/comments/${this.conversation.comments[commentIndex]._id}`).pipe(map(res => {
            if (!res.error) {
                if (res.data === true) {
                    this.conversation.comments.splice(commentIndex, 1);
                    this.commentCount--;
                    return res;
                }
            }
            return res;
        }));
    }

    public getAuthorOfComment(from_uid: string) {
        return this.users.find(user => user._id === from_uid);
    }

    public newEmptyComment() {
        let comment = new Comment(this.userService.user, true, CommentType.MAIN);
        if (!this.emptyComment$) {
            this.emptyComment$ = new BehaviorSubject<Comment>(comment);
        }
        else {
            this.emptyComment$.next(comment);
        }
    }

    public clear() {
        this.users = [];
        this.commentCount = 0;
        this.conversation = null;
        this.emptyComment$.next(new Comment(this.userService.user, true, CommentType.MAIN));
    }
}
