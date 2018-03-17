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

import { GeoDataClass } from './UDX-data.class';
import { UDXSchema } from '../models/UDX-schema.class';
import { DataRefer } from './dataRefer.class';
import * as ObjectID from 'objectid';

export class CmpObj {
    id: any;
    meta: {
        name: string,
        desc: string
    };
    schemaId: string;
    methods: string[];
    dataRefers: Array<DataRefer>
    
    constructor() {
        this.id = ObjectID();
        this.meta = {
            name: '',
            desc: ''
        };
        this.methods = [];
        this.dataRefers = [];
    }
}