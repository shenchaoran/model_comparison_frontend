import { ResourceSrc } from './resource.enum';
import { NETCDF4_Schema, Table_Schema } from './UDX-schema.class';

export class STDData {
    _id: any;
    meta: {
        desc?: string,
        wikiMD?: string,
        wikiHTML?: string,
        name: string
    };
    models: string[];
    tags: string[];
    schemaId: string;
    // inputPath: string;
    // outputPath: string;
    // stdClass: string;
    // content: {
    //     [key: string]: any
    // };
}