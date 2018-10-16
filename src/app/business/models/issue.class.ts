import { ResourceSrc } from './resource.enum';
import { User } from './user.class';
import * as ObjectID from 'objectid';

export class Issue {
    _id?: any;
    meta: {
        name: string,
        desc: string,
        time: number
    };
    auth: {
        src: ResourceSrc,
        userId: string,
        userName: string
    };
    spatial: {
        dimension: 'point' | 'polygon' | 'multi-point',
        geojson: any
    };
    temporal: {
        start: number;
        end: number;
        scale: 'YEAR' | 'DAY';
    };
    solutionIds: string[];
    cid: string[];

    constructor(user: User) {
        this._id = ObjectID().toString();
        this.meta = {
            name: '',
            desc: '',
            time: new Date().getTime()
        };
        this.auth = {
            src: ResourceSrc.PUBLIC,
            userId: user._id,
            userName: user.username
        };
        this.solutionIds = [];
    }
}