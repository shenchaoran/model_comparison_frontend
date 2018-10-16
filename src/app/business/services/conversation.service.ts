import { Injectable } from '@angular/core';
import { ListBaseService } from './list-base.service';
import { UserService } from './user.service';
import { _HttpClient } from '../../common/core/services';
import {
    Conversation,
    CommentType,
    Comment
} from '@models/conversation.class';
import { User } from '../models/user.class';
import { map } from 'rxjs/operators';

var counter = 1;
@Injectable({
    providedIn: 'root'
})
export class ConversationService extends ListBaseService {
    protected baseUrl = '/conversations';
    public pageIndex: number = 1;
    public pageSize: number = 20;
    public commentCount: number;
    public conversation: Conversation;             // 一个服务实例围绕着 conversation 对象做一系列处理
    public comments: Comment[];
    public users: User[];                          // 和 conversation 相关的用户信息，每次查找用户时，从这里查，避免从数据库重复获取

    constructor(
        protected http: _HttpClient,
        private userService: UserService,
        // conversation?: Conversation
    ) {
        super(http);
        console.log('\n******** ConversationService constructor ', counter++);
        this.users = [];
        this.comments = [];
        this.commentCount = 0;
        this.conversation = null;
    }

    createConversation() {
        this.conversation = new Conversation(this.userService.user);
        this.commentCount = 1;
        this.users.push(this.userService.user);
        return this.conversation;
    }

    createComment(type) {
        let comment = new Comment(this.userService.user, this.conversation._id, type);

    }

    findOne(id, withRequestProgress?) {
        return super.findOne(id, withRequestProgress)
            .pipe(
                map(res => {
                    if (res.error) {
                        // TODO
                    }
                    else {
                        this.commentCount = res.data.commentCount;
                        this.conversation = res.data.conversation;
                        this.comments = res.data.comments;
                        this.users = res.data.users;
                        return res;
                    }
                })
            );
    }

    getCommentsByPage(pageIndex: number, pageSize: number) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.http.get(`${this.baseUrl}/${this.conversation._id}/comments`, {
            params: {
                pageIndex,
                pageSize
            }
        })
            .pipe(
                map(res => {
                    if (res.error) {

                    }
                    else {
                        this.commentCount = res.data.count;
                        this.comments = res.data.docs;
                        return res;
                    }
                })
            )
    }

    addComment(comment: Comment) {
        comment._id = null;
        return this.http.post(`${this.baseUrl}/:id/comments`, comment)
            .pipe(
                map(res => {
                    if (res.error) {

                    }
                    else {
                        comment._id = res.data;
                        this.comments.push(comment);
                        this.commentCount++;
                    }
                })
            )
    }
}
