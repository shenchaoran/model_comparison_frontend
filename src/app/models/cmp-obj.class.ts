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
import * as uuidv1 from 'uuid/v1';
// import { ObjectID } from 'mongodb';

export class CmpObj {
    id?: string;
    meta: {
        name: string,
        desc: string
    };
    schemaName: string;
    methods: any[];
    dataRefers?: Array<DataRefer>;
    attached?: {
        valid?: boolean,
        active?: boolean
    };
    
    constructor() {
        this.id = uuidv1();
        this.meta = {
            name: '',
            desc: ''
        };
        this.schemaName = '';
        this.methods = [];
        this.dataRefers = [];
        this.attached = {
            valid: false,
            active: true
        };
    }
}