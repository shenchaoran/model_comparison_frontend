
import { ResourceSrc } from '@models/resource.enum';

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
}