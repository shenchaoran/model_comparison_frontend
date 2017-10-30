export enum UDXType {
    UNKNOWN,
    TABLE,
    SHAPEFILE,
    ASCII_GRID,
    GRID,
    GEOTIFF,
    SPC,
    TIN
}

// 为方便前台处理，table以二维矩阵的形式存储，header存放表头
export class UDXTable {
    header: Array<string>;
    types: Array<string>;
    body: Array<Array<any>>;
    colCount?: number;
    rowCount?: number;
    constructor() {
        this.header = [];
        this.types = [];
        this.body = [];
        this.colCount = 0;
        this.rowCount = 0;
    }
}