import { ResourceSrc } from './resource.enum';

export class ModelService {
    _id: ObjectId;
    service: {
        host: string,
        port: string,
        APIs: {
            intro: string,
            start: string,
            stop: string,
            progress: string,
            data: string
        },
        src: ResourceSrc
    };
    MDL: {
        meta: {
            name: string,
            keywords: [string],
            abstract: string
        },
        IO: [
            {
                name: string,
                type: string,
                description: string,
                optional: boolean,
                schema$: {
                    src: number,
                    externalId: string,
                    structure: any
                }
            }
        ],
        runtime: any
    }
}