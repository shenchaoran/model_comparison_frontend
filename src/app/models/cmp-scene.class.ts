/**
 * 比较场景认为是多个比较任务的集合，从更高层次上来评价比较的结果
 * 
 */

import { CmpTask } from './cmp-task.model';

export class CmpScene {
    _id: ObjectId;
    meta: {
        name: string;
        desc: string;
        time: string;
        author: string;
    };
    cfg: {
        cmpTaskIds: Array<string>;
    }
}