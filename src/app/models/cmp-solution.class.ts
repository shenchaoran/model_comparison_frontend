/**
 * 比较方案只是比较对象的集合
 */
import { ObjectID } from 'mongodb';
import { CmpObj } from './cmp-obj.class';
import { ResourceSrc } from './resource.enum';

export class CmpSolution {
    _id?: ObjectID
    meta: {
        name: string,
        desc: string,
        time: number
    };
    cfg: {
        cmpObjs: Array<CmpObj>,
        keynote: {
            direction: 'x'|'y',
            dimension: 'point' | 'polygon' | 'multi-point',
            participants: Array<any>,
            attached?: {
                [key: string]: any
            }
        }
    };
    auth: {
        userId: string,
        src: ResourceSrc
    };

    constructor() {
        this.meta = {
            name: '',
            desc: '',
            time: undefined
        };
        this.cfg = {
            cmpObjs: [],
            keynote: {
                direction: undefined,
                dimension: undefined,
                participants: [],
                attached: {
                    solutionMeta: {
                        name: '',
                        desc: ''
                    }
                }
            }
        };
        this.auth = {
            userId: undefined,
            src: undefined
        };
    }
}