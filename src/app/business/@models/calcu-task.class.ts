import { User } from './user.class';
/**
 * 计算任务
 * 这个表算是一个中间产物，其实存在cmp-task的calcuTasks中也行，但是多表查询很麻烦
 */

import { ResourceSrc } from './resource.enum';
import { Event } from './model-service.class';
import * as ObjectID from 'objectid';
import { cloneDeep, map } from 'lodash';
import { OGMSState } from './task.class';


export class CalcuTask {
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
    msId: string;
    msName: string;
    topicId: string;
    topicName: string;
    cmpTaskId: string;
    cmpTaskName: string;
    nodeId: string;
    IO: {
        dataSrc: 'STD' | 'UPLOAD',
        inputs: Event[],
        parameters: Event[],
        outputs: Event[],
        std: Event[]
    };
    log: {
        cached: boolean,
        dataId: string
    };
    state: OGMSState;
    progress: number;
    subscribed_uids: string[];
    cid: string;
    [key: string]: any;

    constructor(user: User, ms?) {
        if (ms) {
            this.msId = ms._id;
            this.msName = ms.MDL.meta.name;
            this.topicId = ms.topicId;
            this.topicName = ms.topicName;
            this.IO = cloneDeep(ms.MDL.IO);
            this.IO.dataSrc = 'STD';
            // TODO 选择节点
            this.nodeId = ms.nodeIds[0];
        }
        
        this._id = ObjectID().toString();
        this.meta = {
            name: undefined,
            desc: undefined,
            time: new Date().getTime()
        };
        this.subscribed_uids = [];
        this.state = OGMSState.INIT;
        if(user) {
            this.auth = {
                userId: user._id,
                userName: user.username,
                src: ResourceSrc.PUBLIC
            };
        }
        else {
            this.auth = {
                userId: undefined,
                userName: undefined,
                src: undefined
            };
        }
    }
}