import { User } from './user.class';
/**
 * 比较方案只是比较对象的集合
 */
import { UserService } from '@services/user.service';
import { ResourceSrc } from '@models/resource.enum';
import * as ObjectID from 'objectid';
import { UDXSchema } from '@models/UDX-schema.class';

export class Solution {
    _id?: any;
    meta: {
        name: string,
        desc?: string,
        wikiMD?: string,
        wikiHTML?: string,
        time: number
    };
    auth: {
        userId: string,
        userName: string,
        src: ResourceSrc
    };
    topicIds?: string[];
    msIds?: string[];
    observationIds?: string[];
    temporal?: number;
    cmpObjs: CmpObj[];
    cmpMethods: {
        id: string,
        name: string,
    }[];
    cid: string;
    subscribed_uids: string[];
    [key: string]: any;

    constructor(user: User) {
        this._id = ObjectID().toString();
        this.meta = {
            name: '',
            desc: '',
            time: new Date().getTime()
        };
        this.cmpObjs = [];
        this.cmpMethods = [];
        this.temporal = 30;
        this.subscribed_uids = [];
        this.msIds = [];
        this.observationIds = [];
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

    constructor() {
        this.id = ObjectID().toString();
        this.dataRefers = [];
    }
}

export class DataRefer {
    cachedPosition: 'STD' | 'DB';
    type: 'simulation' | 'observation';
    field?: string;         // 对比要素的字段。在 nc 中变量名，在 csv 中为列名
    value?: string;         // observation 时表示 空间索引或者 文件索引
    lat?: string;
    long?: string;
    // type-simulation: refer from ms-output-event
    msId?: string;
    msName?: string;
    eventType?: 'inputs' | 'outputs';
    eventId?: string;
    eventName?: string;
    schemaId?: string;
    msrName?: string;
    msrId?: string;
    // type-observation: refer from std-data
    stdId?: string;
    stdName?: string;
    datasetId?: string;                 // 标准输入数据集 id
}