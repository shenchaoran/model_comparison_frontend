/**
 * 比较方案只是比较对象的集合
 */
import { ObjectID } from 'mongodb';
import { CmpObj } from './cmp-obj.class';
import { ResourceSrc } from './resource.enum';

export class CmpSolution {
    _id?: any;
    meta: {
        name: string,
        desc: string,
        time: number
    };
    cmpCfg: {
        cmpObjs: Array<{
            id: string,
            meta: {
                name: string,
                desc: string
            },
            schemaName: string,
            methods: string[]
        }>,
        keynote: {
            direction: 'x'|'y',
            dimension: 'point' | 'polygon' | 'multi-point'
        }
    };
    auth: {
        userId: string,
        userName: string,
        src: ResourceSrc
    };

    constructor() {
        this.meta = {
            name: '',
            desc: '',
            time: undefined
        };
        this.cmpCfg = {
            cmpObjs: [],
            keynote: {
                direction: undefined,
                dimension: undefined
            }
        };
        this.auth = {
            userId: undefined,
            userName: undefined,
            src: undefined
        };
    }
}