/**
 * 比较任务包括驱动模型运行的配置，和模型比较的配置
 * cmp task 和参与比较的model task相关联
 */

import { ObjectID } from 'mongodb';
import { GeoDataClass } from './UDX-data.class';
import { ResourceSrc } from './resource.enum';
import { LoginService } from '@feature/login/login.service';

export class CmpTask {
    _id?: ObjectID;
    meta: {
        name: string,
        desc: string,
        time: number
    };
    auth: {
        src: ResourceSrc,
        userId: string
    };
    cmpCfg: {
        solutionId: string
    };
    calcuCfg: {
        dataSrc: 'std' | 'upload',
        // upload
        dataRefer?: Array<{
            msId: string,
            eventName: string,
            dataId: string
        }>,
        dataList?: Array<GeoDataClass>
        // std  时空
        stdSrc?: {
            spatial?: {
                dimension?: 'point' | 'polygon' | 'multi-point',
                // point
                point?: {
                    lat: string,
                    long: string
                },
                // polygon
                // ncols?: number,
                // nrows?: number,
                // yllcorner?: number,
                // xllcorner?: number,
                // cellsize?: number,
                // NODATA_value?: number
                polygon?: any
            },
            temporal?: {
                start: number,
                end: number,
                scale: 'YEAR' | 'DAY'
            }
        }
    };
    calcuTasks: Array<string>;

    constructor() {
        const user = LoginService.getUser();

        this.meta = {
            name: undefined,
            desc: undefined,
            time: (new Date()).getTime()
        };
        this.auth = {
            src: ResourceSrc.PRIVATE,
            userId: user? user._id: undefined
        };
        this.cmpCfg = {
            solutionId: undefined
        };
        this.calcuCfg = {
            dataSrc: undefined,
            dataRefer: [],
            dataList: [],
            stdSrc: {
                spatial: {
                    
                },
                temporal: {
                    start: undefined,
                    end: undefined,
                    scale: 'DAY'
                }
            }
        };
        this.calcuTasks = [];
    }
}