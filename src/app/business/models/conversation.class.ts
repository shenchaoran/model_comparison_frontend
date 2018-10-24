import * as ObjectID from 'objectid';
import { User } from './user.class';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';

export class Conversation {
    _id?: any;
    pid: string;
    // 点赞
    like_uids: string[];
    // 收藏
    love_uids: string[];
    tags: (string | 'TOP' | 'HOT')[];
    comments: Comment[];
    
    constructor(user: User, pid: string) {
        this._id = ObjectID().toString();
        this.pid = pid;
        this.like_uids = [];
        this.love_uids = [];
        this.tags = [];
        this.comments = [];
    }
}

export class Comment {
    _id?: any;
    // 编辑的历史
    content: {
        time: number,
        html: string,
        md: string,
        state: CommentState
    }[];
    // 版本号
    svid: number;
    from_uid: string;
    anonymous: boolean;
    // 可以为空，表示不是回复评论
    to_uid?: string;
    // @ 的用户
    notified_uids?: string[];
    // cid: string;
    type: CommentType;
    hideReason?: string;
    // emoji react
    reactions?: {
        name: string,
        count: number
    }[];
    hadSaved: boolean;

    constructor(user: User, hadSaved: boolean = false, type: CommentType, to_uid?: string, state: CommentState = CommentState.WRITE) {
        this._id = ObjectID().toString();
        this.content = [{
            time: new Date().getTime(),
            html: '',
            md: '',
            state: state
        }];
        this.svid = 0;
        this.reactions = [];
        this.to_uid = to_uid;
        this.hadSaved = hadSaved;
        if(user) {
            this.from_uid = user._id;
            this.anonymous = false;
            this.type = type;
        }
    }
}

export enum CommentType {
    MAIN = 'MAIN',
    REPLY = 'REPLY',
    HIDE = 'HIDE'
};

export enum CommentState {
    WRITE = 'WRITE',
    READ = 'READ'
}