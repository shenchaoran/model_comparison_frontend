export class CmpMethod {
    _id?: any;
    meta: {
        name: string,
        desc?: string,
        wikiMD?: string,
        wikiHTML?: string,
        time: number,
        img: string,
    };
    IO: {
        inputs: any[],
        outputs: any[]
    };
}

export enum CmpMethodEnum {
    TABLE_CHART,
    TABLE_STATISTIC,
    SHAPEFILE_VISUALIZATION,
    SHAPEFILE_STATISTIC,
    SHAPEFILE_INTERPOLATION,
    ASCII_GRID_VISUALIZATION,
    ASCII_GRID_STATISTIC,
    ASCII_GRID_BATCH_VISUALIZATION,
    GIF
  }