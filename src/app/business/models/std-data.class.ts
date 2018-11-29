import { ResourceSrc } from './resource.enum';

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
    schema$: {
        type: string,
        dimensions?: any[],
        variables?: any[]
    }
    // inputPath: string;
    // outputPath: string;
    // stdClass: string;
    // content: {
    //     [key: string]: any
    // };
}