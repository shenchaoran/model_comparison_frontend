/**
 * 计算任务
 * 这个表算是一个中间产物，其实存在cmp-task的calcuTasks中也行，但是多表查询很麻烦
 */

import { ResourceSrc } from './resource.enum';
import * as ObjectID from 'objectid';
import { UserService } from '../services/user.service';


export class CalcuTask {
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
    ms: any;
    topic: string;
    cmpTaskId: string;
    node: any;
    IO: {
        dataSrc: 'STD' | 'UPLOAD',
        schemas: any[],
        data: any[],
        std: any[]
    };
    std: any;
    state: CalcuTaskState;
    progress: number;
    // [key: string]: any;

    constructor(userService: UserService, ms?) {
        if (ms) {
            this.ms = ms;
            this.topic = ms.topic;
            this.IO = _.cloneDeep(ms.MDL.IO);
            this.IO.dataSrc = 'STD';
            let appendSchema = (type, schema) => {
                _.map(this.IO[type], event => {
                    if (event.schemaId === schema.id) {
                        event.schema = schema;
                    }
                });
            }
            _.map(this.IO.schemas, schema => {
                appendSchema('inputs', schema);
                appendSchema('std', schema);
                appendSchema('parameters', schema);
                appendSchema('outputs', schema);
            });
        }
        
        this._id = ObjectID();
        this.meta = {
            name: undefined,
            desc: undefined,
            time: new Date().getTime()
        };
        this.state = CalcuTaskState.INIT;
        const user = userService.user;
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

export enum CalcuTaskState {
    INIT = 'INIT',
    COULD_START = 'COULD_START',
    START_PENDING = 'START_PENDING',
    START_FAILED = 'START_FAILED',
    RUNNING = 'RUNNING',
    FINISHED_FAILED = 'FINISHED_FAILED',
    FINISHED_SUCCEED = 'FINISHED_SUCCEED'
};