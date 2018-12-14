import { ResourceSrc } from './resource.enum';
import { User } from './user.class';
import * as ObjectID from 'objectid';

export class Topic {
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
    spatial: {
        dimension: 'point' | 'polygon' | 'multi-point',
        geojson: any
    };
    temporal: {
        start: number;
        end: number;
        scale: 'YEAR' | 'DAY';
    };
    cid: string;
    subscribed_uids: string[];

    constructor(user: User, cid?: string) {
        this._id = ObjectID().toString();
        this.meta = {
            name: '',
            wikiMD: '',
            wikiHTML: '',
            time: new Date().getTime()
        };
        this.auth = {
            src: ResourceSrc.PUBLIC,
            userId: user._id,
            userName: user.username
        };
        this.subscribed_uids = [];
        this.cid = cid;
    }
}