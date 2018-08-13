import { CmpState } from './cmp-state.enum';

export class CmpResult {
    image?: [{
      extent: any,
      path: string,
      title: string,
      progress: number
    }];
    chart?: {
        progress: number,
        tableSrc: any               // 不能放在
    };
    GIF?: {
        progress: number
    };
    statistic?: {
        progress: number,
        tableSrc: any
    };
}