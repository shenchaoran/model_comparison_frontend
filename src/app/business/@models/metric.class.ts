
export class Metric {
    name: string;               // 代码里的缩写
    long_name: string;          // 界面上显示的名称
    unit: string;               // 单位
    description: string;        // 物理含义
    category: string | 'Carbon emission';           // 领域
    // scale?: number;             // 缩放因子，默认为1，应该放在 event 里
    // offset?: number;            // 偏移量，默认为0，同放在 event 里
    min: number;                // 最小合理值
    max: number;                // 最大合理值
    couldCMP: boolean;          // 是否参与对比
}