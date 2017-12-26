/**
 * 比较方案只是比较对象的集合
 */
import { ObjectID } from 'mongodb';
import { CmpObj } from './cmp-obj.class';
import { ResourceSrc } from './resource.enum';

export class CmpSolution {
    _id?: string;
    meta: {
        name: string,
        desc: string,
        time: number
    };
    cmpCfg: {
        ms: Array<{
            msId: string,
            msName: string,
            nodeName: string,
            participate: boolean,
        }>,
        cmpObjs: Array<CmpObj>,
        keynote: {
            direction: 'x'|'y',
            dimension: 'point' | 'polygon' | 'multi-point'
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
        this.cmpCfg = {
            ms: [],
            cmpObjs: [],
            keynote: {
                direction: undefined,
                dimension: undefined
            }
        };
        this.auth = {
            userId: undefined,
            src: undefined
        };
    }
}