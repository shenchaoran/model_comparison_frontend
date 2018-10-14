export class Conversation {
    _id?: any;
    // 点赞
    like_uids: string[];
    // 收藏
    love_uids: string[];
    tags: (string | 'TOP' | 'HOT')[];
    comments: Comment[];
    participants: string[];
}

export class Comment {
    _id?: any;
    // 编辑的历史
    content: {
        time: number,
        value: string
    }[];
    from_uid: string;
    anonymous: boolean;
    // 可以为空，表示不是回复评论
    to_uid?: string;
    // @ 的用户
    notified_uids?: string[];
    cid: string;
    type: 'MAIN' | 'REPLY' | 'HIDE';
    hideReason?: string;
    // emoji react
    reactions?: {
        name: string,
        count: number
    }[];
}