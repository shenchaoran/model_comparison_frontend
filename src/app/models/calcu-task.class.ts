/**
 * 计算任务
 * 这个表算是一个中间产物，其实存在cmp-task的calcuTasks中也行，但是多表查询很麻烦
 */

import { ResourceSrc } from './resource.enum';
import * as ObjectID from 'objectid';
import { LoginService } from '@feature/login/login.service';


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
    msId: string;
    msName: string;
    cmpTaskId: string;
    nodeName: string;
    IO: {
        dataSrc: 'STD' | 'UPLOAD',
        schemas: any[],
        data: any[],
        std: any[]
    };
    state: CalcuTaskState;
    progress: number;

    constructor() {
        this.meta = {
            name: undefined,
            desc: undefined,
            time: new Date().getTime()
        };
        this._id = ObjectID();
        this.state = CalcuTaskState.INIT;
        const user = LoginService.getUser();
        if(user) {
            this.auth = {
                userId: user._id,
                userName: user.username,
                src: ResourceSrc.PUBLIC
            };
        }
    }
}

export enum CalcuTaskState {
    INIT = 0,
    PAUSE,
    START_PENDING,
    START_FAILED,
    RUNNING,
    FINISHED_FAILED,
    FINISHED_SUCCEED
}
