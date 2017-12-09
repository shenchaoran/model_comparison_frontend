/**
 * 比较对象：从某一类数据文件中抽取出某一部分参与比较，称为比较对象。和数据schema关联
 * comparison object:
 *      Table
 *          chart (column)
 *          statistic (columns)
 *      Ascii_grid
 *          visualization (cesium)
 *          // mixing（图层混合） （放在前台处理或许更好？）
 *               
 *      Gif (Ascii grid with timestamp)
 *          visualization 
 *          
 *      Shp
 *          visualization
 *          插值 -> Ascii_grid
 *      
 */

import { GeoDataClass } from './UDX-data.model';
import { UDXSchema } from '../models/UDX-schema.class';

export class CmpObj {
    id: string;
    meta: {
        name: string,
        desc: string
    };
    dataRefer: Array<{
        msId: string,
        eventName: string,
        // data 存放具体比较的配置，如chart的列名，图像处理
        data: any
    }>;
    schema$: UDXSchema;
    method: string;

    static TYPES = {
        TABLE_CHART: 'TABLE_CHART',
        TABLE_STATISTIC: 'TABLE_STATISTIC',
        ASCII_GRID_VISUALIZATION: 'ASCII_GRID_VISUALIZATION',
        ASCII_GRID_MIXING: 'ASCII_GRID_MIXING',
        GIF: 'GIF',
        SHAPEFILE_VISUALIZATION: 'SHAPEFILE_VISUALIZATION',
        SHAPEFILE_INTERPOLATION: 'SHAPEFILE_INTERPOLATION',
    };
    
}