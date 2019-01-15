import { User } from './user.class';
import { UserService } from '@services/user.service';
import { UDXSchema } from '@models/UDX-schema.class';
import { ResourceSrc } from '@models/resource.enum';
import * as ObjectID from 'objectid';
import { DataRefer, CmpObj } from '@models/solution.class';

export class Task {
    _id?: any;
    meta: {
        name: string,
        desc?: string,
        wikiMD?: string,
        wikiHTML?: string,
        time: number
    };
    auth: {
        src: ResourceSrc,
        userId: string,
        userName: string
    };
    state: OGMSState;
    progress: number;
    solutionId?: string;
    calcuTaskIds: string[];
    cmpObjs: Array<CmpObj>;
    cmpMethods: Array<{
        id: string,
        name: string,
    }>;
    refactored?: {
        metricName: string,
        fname: string,
        methods?: {
            // isAllSTDCache === true: 
            // imgFPath = `public/images/std-plots/`${index}-${lat}-${long}-${field}-${slnId}``
            methodId: string,
            methodName: string,
            progress: number,
            state: string,
            result: {
                img?: string,
                ext?: string,
                imgPrefix?: string,
                timeLabels?: string,
                regionLength?: string,
                format?: string,
            },
        }[],
    }[];
    regions?: [][];
    sites?: any[];
    cid: string;
    subscribed_uids: string[];

    constructor(user: User) {
        this._id = ObjectID().toString();
        this.meta = {
            name: null,
            desc: null,
            time: new Date().getTime()
        };
        this.calcuTaskIds = [];
        this.cmpObjs = [];
        this.cmpMethods = [];
        this.refactored = [];
        this.subscribed_uids = [];
        this.regions = [];
        this.sites = [];
        
        if(user) {
            this.auth = {
                userId: user._id,
                userName: user.username,
                src: ResourceSrc.PUBLIC
            };
        }
        else {
            this.auth = {
                userId: null,
                userName: null,
                src: null
            };
        }
    }
}

export enum OGMSState {
    INIT = 'INIT',
    COULD_START = 'COULD_START',
    RUNNING = 'RUNNING',
    FINISHED_SUCCEED = 'FINISHED_SUCCEED',
    FINISHED_FAILED = 'FINISHED_FAILED',
    PENDING = 'PENDING',
};