/**
 * 比较方案只是比较对象的集合
 */

import { CmpObj } from './cmp-obj.class';

export class CmpSolution {
    _id: ObjectId
    meta: {
        name: string,
        desc: string,
        time: string,
        author: string
    };
    cfg: {
        cmpObjs: Array<CmpObj>,
        keynote: {
            direction: 'x'|'y',
            dimension: 'point'|'polygon'
        }
    };
}