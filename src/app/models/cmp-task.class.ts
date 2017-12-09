/**
 * 比较任务包括驱动模型运行的配置，和模型比较的配置
 * cmp task 和参与比较的model task相关联
 */

import { GeoDataClass } from './UDX-data.model';

export class CmpTask {
    _id: ObjectId;
    meta: {
        name: string,
        desc: string,
        time: string,
        author: string
    };
    cmpCfg: {
        solutionId: string,
        dataList: Array<GeoDataClass>
    };
    calcuCfg: Array<{
        msId: string,
        eventName: string,
        dataId: string
    }>;
    calcuTasks: Array<string>;
}