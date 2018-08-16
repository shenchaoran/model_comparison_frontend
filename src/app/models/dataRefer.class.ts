import { CmpResult } from '@models/cmp-result.class';

export class DataRefer {
    msId: string;
    msName: string;
    eventId: string;
    field?: string;
    dataId?: string;
    cmpResult?: CmpResult;
}