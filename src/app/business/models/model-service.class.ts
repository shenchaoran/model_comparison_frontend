
import { ResourceSrc } from '@models/resource.enum';
import { UDXSchema } from '@models/UDX-schema.class';

export class MS {
    _id: string;
    auth: {
        nodeName: string,
        src: ResourceSrc
    };
    MDL: {
        meta: {
            name: string,
            keywords: string[],
            abstract: string,
            desc?: string,
            descMD?: string,
            descHTML?: string,
        },
        IO: {
            schemas: UDXSchema[],
            data: Event[],
            std?: any[]
        },
        runtime: any;
    };
    stdIds: string[];
    topic: string;
    exeName: string;
    subscribed_uids: string[];
}

export class Event {
    id: string;
    type: 'input' | 'output' | 'parameter';
    description: string;
    schemaId: string;
}