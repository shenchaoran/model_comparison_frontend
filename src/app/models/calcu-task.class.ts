/**
 * 计算任务
 * 这个表算是一个中间产物，其实存在cmp-task的calcuTasks中也行，但是多表查询很麻烦
 */

import { ResourceSrc } from './resource.enum';
import { CalcuCfg } from './cmp-task.class';

export class CalcuTask {
    _id?: any;
    msId: string;
    cmpTaskId: string;
    nodeName: string;
    calcuCfg: CalcuCfg;
    output: Array<{
        eventName: string;
        dataId: string;
    }>;
    state: CalcuTaskState;
}

export enum CalcuTaskState {
    INIT = 0,
    PAUSE,
    START_PENDING,
    START_FAILED,
    RUNNING,
    RUN_FAILED,
    RUN_SUCCEED
}
