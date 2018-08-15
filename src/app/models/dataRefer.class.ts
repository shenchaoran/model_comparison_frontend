import { CmpResult } from '@models/cmp-result.class';

export class DataRefer {
    msId: string;
    msName: string;
    eventName: string;
    field?: string;
    schemaId: string;
    dataId?: string;
    cmpResult?: CmpResult
}