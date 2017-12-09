import { Mongoose } from './mongoose.base';
import { UDXSchema } from './UDX-schema.class';
import { ResourceSrc } from './resource.enum';

export class GeoDataClass {
    _id: ObjectId;
    filename: string;
    path: string;
    schema$: UDXSchema;
    permission: string;
    userId: string;
    desc: string;
    src: ResourceSrc;
}