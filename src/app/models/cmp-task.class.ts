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
    _id?: any;
    meta: {
        name: string,
        desc: string,
        time: number
    };
    auth: {
        src: ResourceSrc,
        userName: string,
        userId: string
    };
    cmpCfg: {
        solutionId: string,
        ms: Array<{
            msId: string,
            msName: string,
            nodeName: string,
            participate: boolean
        }>,
        // 这里暂时先把sln的所有字段复制过来了，避免了多表查询
        keynote: {
            direction: 'x'|'y',
            dimension: 'point' | 'polygon' | 'multi-point'
        },
        cmpObjs: Array<{
            id: string,
            meta: {
                name: string,
                desc: string
            },
            schemaName: string,
            methods: string[],
            dataRefers: Array<{
                // 独立上传的，不是模型算出来的数据
                independent?: boolean,
                msId?: string,
                msName?: string,
                eventName?: string,
                dataId: string,
                // data 存放具体比较的配置，如chart的列名，图像处理
                data: any,
                cmpResult: {
                    state: CmpState,
                    image?: [{
                      extent: any,
                      path: string,
                      title: string,
                      state: CmpState
                    }],
                    chart?: {
                        state: CmpState
                    },
                    GIF?: {
                        state: CmpState
                    },
                    statistic?: {
                        state: CmpState
                    },
                }
            }>,
            attached: any
        }>
    };
    // 计算配置，即输入数据
    calcuCfg: CalcuCfg;
    cmpState: CmpState;
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
            userName: user? user.username: undefined,
            userId: user? user._id: undefined
        };
        this.cmpCfg = {
            solutionId: undefined,
            ms: [],
            keynote: {
                direction: undefined,
                dimension: undefined
            },
            cmpObjs: []
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
    FINISHED_SUCCEED,
    FINISHED_FAILED,
    FINISHED
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