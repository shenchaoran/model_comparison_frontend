import { ObjectID } from 'mongodb';
import { ResourceSrc } from './resource.enum';
import { UDXCfg } from './UDX-cfg.class';

export class GeoDataClass {
    _id?: ObjectID;
    filename: string;
    path: string;
    udxcfg: UDXCfg;
    permission: string;
    userId: string;
    desc: string;
    src: ResourceSrc;
}