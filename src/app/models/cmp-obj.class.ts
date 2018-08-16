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

import { GeoDataClass } from '@models/UDX-data.class';
import { UDXSchema } from '@models/UDX-schema.class';
import { DataRefer } from '@models/dataRefer.class';
import * as ObjectID from 'objectid';

export class CmpObj {
    id: any;
    name: string;
    desc: string;
    // 此处的数据参考是比较对象的数据参考，可能是输入，但绝大多数都是输出
    // TODO 对于日期的处理，暂时理解为时间区域内只有一个输出
    dataRefers: Array<DataRefer>;
    schemaId?: string;
    methods: string[];
    progress?: number;
    
    constructor() {
        this.id = ObjectID();
        this.methods = [];
        this.dataRefers = [];
        this.progress = 0;
    }
}