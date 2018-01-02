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

import * as uuidv1 from 'uuid/v1';
// import { ObjectID } from 'mongodb';

export class CmpObj {
    id?: string;
    meta: {
        name: string,
        desc: string
    };
    dataRefers: Array<{
        msId: string,
        msName?: string,
        eventName: string,
        dataId?: string,
        // data 存放具体比较的配置，如chart的列名，图像处理
        data: any,
        schema$?: UDXSchema
    }>;
    cmpResults?: Array<CmpResult>;
    schemaTypes: string[];
    methods: any[];
    attached?: any;
    
    constructor() {
        this.id = uuidv1();
        this.meta = {
            name: '',
            desc: ''
        };
        this.dataRefers = [];
        this.schemaTypes = [];
        this.cmpResults = [];
        this.methods = [];
        this.attached = {};
    }
}

export class CmpResult {
    image?: {

    };
    chart?: {

    };
    GIF?: {

    };
    statistic?: {

    };
}