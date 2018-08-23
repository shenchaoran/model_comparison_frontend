/**
 * 比较方案只是比较对象的集合
 */
import { ResourceSrc } from '@models/resource.enum';
import { LoginService } from '@common/feature/login/login.service';
import * as ObjectID from 'objectid';

export class CmpSolution {
    _id?: any;
    meta: {
        name: string,
        desc: string,
        time: number
    };
    auth: {
        userId: string,
        userName: string,
        src: ResourceSrc
    };
    issueId: string;
    participants: any[];
    cmpObjs: CmpObj[];
    [key: string]: any;

    constructor() {
        this._id = ObjectID();
        this.meta = {
            name: '',
            desc: '',
            time: new Date().getTime()
        };
        this.cmpObjs = [];
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

export class CmpObj {
    id: string;
    name: string;
    desc: string;
    // 此处的数据参考是比较对象的数据参考，可能是输入，但绝大多数都是输出
    // TODO 对于日期的处理，暂时理解为时间区域内只有一个输出
    dataRefers: Array<DataRefer>;
    schemaId?: string;
    methods: {
        id: string,
        name: string
    }[];
    progress?: number;

    constructor() {
        this.id = ObjectID();
        this.methods = [];
        this.dataRefers = [];
        this.progress = 0;
    }
}

export class DataRefer {
    msId: string;
    msName: string;
    eventId: string;
    field?: string;
    dataId?: string;
    cmpResult?: any;
}