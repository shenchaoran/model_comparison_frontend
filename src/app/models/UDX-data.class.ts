
import { ResourceSrc } from '@models/resource.enum';
import { UDXCfg } from '@models/UDX-cfg.class';

export class GeoDataClass {
    _id: string;
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