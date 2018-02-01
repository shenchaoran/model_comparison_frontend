import { CmpResult } from './cmp-result.class';

export class DataRefer {
    // 独立上传的，不是模型算出来的数据
    independent?: boolean;
    msId?: string;
    msName?: string;
    eventName?: string;
    dataId?: string;
    // data 存放具体比较的配置，如chart的列名，图像处;
    data: any;
    cmpResult?: CmpResult;
    attached: any
}