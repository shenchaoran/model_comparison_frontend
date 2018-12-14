/**
 * 计算节点
 */

import { ResourceSrc } from './resource.enum';

export class ComputingNode {
    _id?: any;
    host: string;
    port: string;
    API_prefix: string;
    auth: {
        nodeName: string,
        password: string,
        src: ResourceSrc
    }
}
