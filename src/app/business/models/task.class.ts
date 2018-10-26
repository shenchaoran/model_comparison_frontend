import { User } from './user.class';
import { UserService } from '@services/user.service';
import { UDXSchema } from '@models/UDX-schema.class';
import { ResourceSrc } from '@models/resource.enum';
import * as ObjectID from 'objectid';
import { DataRefer, CmpObj } from '@models/solution.class';

export class Task {
    _id?: any;
    meta: {
        name: string,
        desc?: string,
        wikiMD?: string,
        wikiHTML?: string,
        time: number
    };
    auth: {
        src: ResourceSrc,
        userId: string,
        userName: string
    };
    state: CmpState;
    progress: number;
    solutionId?: string;
    topicId?: string;
    calcuTaskIds: {
        _id: string,
        progress: number
    }[];
    cmpObjs: Array<CmpObj>;
    schemas: UDXSchema[];
    cid: string;
    subscribed_uids: string[];

    constructor(user: User) {
        this._id = ObjectID().toString();
        this.meta = {
            name: null,
            desc: null,
            time: new Date().getTime()
        };
        this.calcuTaskIds = [];
        this.cmpObjs = [];
        this.schemas = [];
        this.subscribed_uids = [];
        
        if(user) {
            this.auth = {
                userId: user._id,
                userName: user.username,
                src: ResourceSrc.PUBLIC
            };
        }
        else {
            this.auth = {
                userId: null,
                userName: null,
                src: null
            };
        }
    }
}

export enum CmpState {
    INIT = 'INIT',
    COULD_START = 'COULD_START',
    RUNNING = 'RUNNING',
    FINISHED_SUCCEED = 'FINISHED_SUCCEED',
    FINISHED_FAILED = 'FINISHED_FAILED'
};

export class CmpResult {
    image?: [{
      extent: any,
      path: string,                 // data/:id/:entry 此处返回一个图片的文件路径，不要把base64塞进去，不然太大
      title: string,
      progress: number
    }];
    chart?: {
        show: any,
        prop: any
        // progress: number,
        // path: string,               // data/:id/:entrance 同样的，这里也放一个文件路径，前台解析为二位数组，做成 chart
        // row: any[]
    };
    GIF?: {
        progress: number
    };
    statistic?: {
        progress: number,
        path: string
    };
}