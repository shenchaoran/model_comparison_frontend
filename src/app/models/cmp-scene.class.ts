/**
 * 比较场景认为是多个比较任务的集合，从更高层次上来评价比较的结果
 * 
 */
import { ObjectID } from 'mongodb';
import { CmpTask } from './cmp-task.class';
import { ResourceSrc } from './resource.enum';

export class CmpScene {
    _id: string;
    meta: {
        name: string,
        desc: string,
        time: string
    };
    auth: {
        userId: string,
        src: ResourceSrc
    };
    cfg: {
        cmpTaskIds: Array<string>;
    }
}