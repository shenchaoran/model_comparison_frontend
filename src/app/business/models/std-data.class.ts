import { ResourceSrc } from './resource.enum';


class STDData {
    _id: any;
    meta: {
        desc?: string,
        wikiMD?: string,
        wikiHTML?: string,
        name: string
    };
    models: string[];
    inputPath: string;
    outputPath: string;
    // stdClass: string;
    content: {
        [key: string]: any
    };
}