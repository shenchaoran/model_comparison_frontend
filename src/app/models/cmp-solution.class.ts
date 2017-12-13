/**
 * 比较方案只是比较对象的集合
 */
import { ObjectID } from 'mongodb';
import { CmpObj } from './cmp-obj.class';

export class CmpSolution {
    _id?: ObjectID
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
            dimension: 'point'|'polygon',
            participants: Array<any>
        }
    };

    constructor() {
        this.meta = {
            name: '',
            desc: '',
            time: '',
            author: ''
        };
        this.cfg = {
            cmpObjs: [],
            keynote: {
                direction: undefined,
                dimension: undefined,
                participants: []
            }
        };
    }
}