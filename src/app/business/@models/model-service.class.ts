
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
            wikiMD?: string,
            wikiHTML?: string,
        },
        IO: {
            std?: Event[],
            inputs: Event[],
            parameters?: Event[],
            outputs: Event[]
        },
        runtime: any;
    };
    nodeIds: string;
    tag: string;
    topicId: string;
    topicName: string;
    exeName: string;
    subscribed_uids: string[];
}

export class Event {
    id: string;
    stdName: string;
    name: string;
    description: string;
    schemaId: string;
    // 该字段用于 获取文件
    // upload: data id
    // std: index in std
    temporal?: 'daily' | 'annual';
    value?: string;
    // 如果从计算服务器上下载过来了，就为 true
    cached?: boolean;
    // TODO 
    // isFile?: boolean;
    optional?: number;
    // 该字段用于 文件下载时的文件名 和 前台显示 label
    fname?: string;
    // 下载链接
    url?: string;
    ext: string;
}