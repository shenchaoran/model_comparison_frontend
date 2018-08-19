import { ResourceSrc } from './resource.enum';
import { LoginService } from '@common/feature/login/login.service';
import * as ObjectID from 'objectid';
import { Enum } from 'typescript-string-enums/dist';

export class CmpTask {
    _id?: any;
    meta: {
        name: string,
        desc: string,
        time: number
    };
    auth: {
        src: ResourceSrc,
        userId: string,
        userName: string
    };
    state: string;
    progress: number;
    solutionId?: string;
    issueId?: string;
    calcuTaskIds: {
        _id: string,
        progress: number
    }[];

    constructor() {
        this._id = ObjectID();
        this.meta = {
            name: null,
            desc: null,
            time: new Date().getTime()
        };
        this.calcuTaskIds = [];
        
        const user = LoginService.getUser();
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

export const CmpState = Enum(
    'INIT',
    'RUNNING',
    'FINISHED_SUCCEED',
    'FINISHED_FAILED',
    'FINISHED'
)
export type CmpState = Enum<typeof CmpState>

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