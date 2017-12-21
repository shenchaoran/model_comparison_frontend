import { ObjectID } from 'mongodb';
import { ResourceSrc } from './resource.enum';
import { UDXCfg } from './UDX-cfg.class';

export class GeoDataClass {
    _id?: ObjectID;
    meta?: {
        name: string,
        path: string,
        desc: string
    };

    auth: {
        permission?: string,
        userId: string,
        src: ResourceSrc
    };
    
    udxcfg: UDXCfg;
}