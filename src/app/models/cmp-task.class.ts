/**
 * 比较任务包括驱动模型运行的配置，和模型比较的配置
 * cmp task 和参与比较的model task相关联
 */

import { ObjectID } from 'mongodb';
import { GeoDataClass } from './UDX-data.class';
import { ResourceSrc } from './resource.enum';
import { LoginService } from '@feature/login/login.service';
import { CmpObj } from './cmp-obj.class';
import { CalcuTaskState } from './calcu-task.class';

export class CmpTask {
    _id: string;
    meta: {
        name: string,
        desc: string,
        time: number
    };
    auth: {
        src: ResourceSrc,
        userId: string
    };
    cmpCfg: {
        solutionId: string,
        cmpObjs?: Array<CmpObj>
    };
    cmpState: CmpState;
    calcuCfg: CalcuCfg;
    calcuTasks: Array<{
        calcuTaskId: string,
        state: CalcuTaskState
    }>;

    constructor() {
        const user = LoginService.getUser();

        this.meta = {
            name: undefined,
            desc: undefined,
            time: (new Date()).getTime()
        };
        this.auth = {
            src: ResourceSrc.PRIVATE,
            userId: user? user._id: undefined
        };
        this.cmpCfg = {
            solutionId: undefined
        };
        this.cmpState = CmpState.INIT;
        this.calcuCfg = {
            dataSrc: undefined,
            dataRefers: [],
            stdSrc: {
                spatial: {
                    
                },
                temporal: {
                    start: undefined,
                    end: undefined,
                    scale: 'DAY'
                }
            }
        };
        this.calcuTasks = [];
    }
}

export enum CmpState {
    INIT = 0,
    RUNNING,
    SUCCEED,
    FAILED
}

// TODO 纵向比较时，要多份数据，
export class CalcuCfg {
    dataSrc: 'std' | 'upload';
    // upload
    dataRefers?: Array<{
        msId: string,
        eventName: string,
        dataId: string
    }>;
    // std  时空
    stdSrc?: {
        spatial?: {
            dimension?: 'point' | 'polygon' | 'multi-point',
            point?: any,
            polygon?: any,
            multiPoint?: any
        },
        temporal?: {
            start: number,
            end: number,
            scale: 'YEAR' | 'DAY'
        }
    }
}