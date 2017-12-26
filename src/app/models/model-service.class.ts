import { ObjectID } from 'mongodb';
import { ResourceSrc } from './resource.enum';
import { UDXSchema } from './UDX-schema.class';

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
            abstract: string
        },
        IO: {
            schemas: UDXSchema[],
            data: Event[]
        },
        runtime: any;
    };
    attached?: {[key: string]: any};
}

// 可以还原出一棵树，可以表现父子关系、多选一关系
// 表示可选关系时，
export class Event {
    // 当前event name
    id: string;
    // 级联关系
    parentId?: string;
    childrenId?: Array<string>;
    // 多选一关系
    options?: Array<string>;
    optionType?: 'value' | 'file';
    // 输入还是输出
    type?: 'input' | 'output';
    description?: string;
    optional?: boolean;
    schemaId?: string;
}
