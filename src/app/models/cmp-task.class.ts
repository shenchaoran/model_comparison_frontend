/**
 * 比较任务包括驱动模型运行的配置，和模型比较的配置
 * cmp task 和参与比较的model task相关联
 */

import { GeoDataClass } from '@models/UDX-data.class';
import { ResourceSrc } from '@models/resource.enum';
import { LoginService } from '@common/feature/login/login.service';
import { CalcuTaskState } from '@models/calcu-task.class';
import { CmpObj } from '@models/cmp-obj.class';

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
    // 0-100, -1
    progress: number;
    solutionId: string;
    calcuTaskIds: {
        _id: any,
        progress: number
    }[];
    cmpObjs: CmpObj[];

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
        this.progress = 0;
        this.cmpObjs = [];
        this.calcuTaskIds = [];
    }
}