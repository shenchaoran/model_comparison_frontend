export class CalcuCfg {
    // TODO 目前认为全部为标准数据，不能用户上传
    spatial?: {
        dimension?: 'point' | 'polygon' | 'multi-point',
        geojson: any
    };
    temporal?: {
        start: number;
        end: number;
        scale: 'YEAR' | 'DAY';
    };
}