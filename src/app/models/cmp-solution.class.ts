/**
 * 比较方案只是比较对象的集合
 */
import { ResourceSrc } from './resource.enum';
import { DataRefer } from './dataRefer.class';

export class CmpSolution {
    _id?: any;
    meta: {
        name: string,
        desc: string,
        time: number
    };
    auth: {
        userId: string,
        userName: string,
        src: ResourceSrc
    };
    issueId: string;
    cmpCfg: {
        ms: {
            msId: string,
            msName: string,
            participate: boolean
        }[],
        keynote: {
            direction: 'multi'|'single',
            dimension: 'point' | 'polygon' | 'multi-point'
        },
        cmpObjs: {
            id: string,
            // 比较对象描述
            meta: {
                name: string,
                desc: string
            },
            // 比较对象配置
            schemaName: string,
            methods: string[],
            dataRefers: DataRefer[],
            attached: any
        }[]
    };
    [key: string]: any;

    constructor() {
        this.meta = {
            name: '',
            desc: '',
            time: undefined
        };
        this.issueId = undefined;
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
            userName: undefined,
            src: undefined
        };
    }
}