export enum UDXType {
    // UNKNOWN_XML,
    // TABLE_XML,
    // SHAPEFILE_XML,
    // ASCII_GRID_XML,
    // GRID_XML,
    // GEOTIFF_XML,
    // SPC_XML,
    // TIN_XML,
    UNKNOWN,
    TABLE_RAW,
    SHAPEFILE_RAW,
    ASCII_GRID_RAW,
    GRID_RAW,
    GEOTIFF_RAW,
    SPC_RAW,
    TIN_RAW
}

// 为方便前台处理，table以二维矩阵的形式存储，header存放表头
export class UDXTableXML {
    columns: Array<{
        data: string;
        title: string;
        type?: string;
        readOnly: boolean;
    }>;
    data: Array<any>;
    constructor() {
        this.columns = [];
        this.data = [];
    }
}