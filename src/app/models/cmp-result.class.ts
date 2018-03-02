import { CmpState } from './cmp-state.enum';

export class CmpResult {
    state: CmpState;                // undefined/INIT, RUNNING, FINISHE
    image?: [{
      extent: any,
      path: string,
      title: string,
      state: CmpState                // FINISHED_SUCCEED, FINISHED_FAILED
    }];
    chart?: {
        state: CmpState,
        tableSrc: any               // 不能放在
    };
    GIF?: {
        state: CmpState
    };
    statistic?: {
        state: CmpState,
        tableSrc: any
    };
}