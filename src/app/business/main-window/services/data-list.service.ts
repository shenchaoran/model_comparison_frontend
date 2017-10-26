import { Injectable } from '@angular/core';

import {
    SubMenuType,
    SubMenu
} from '../../../common/shared/components/context-menu/sub-menu';
import { GeoData } from '../component/data-list/geo-data';

export enum ContextMenuType {
    BLACK = 1,
    DATAITEM = 2
}

@Injectable()
export class DataListService {
    constructor() {}

    getContextMenuCfg(type: ContextMenuType, geoData?: GeoData): Array<SubMenu> {
        if (type === ContextMenuType.BLACK) {
            return [
                {
                    title: 'add',
                    type: SubMenuType.SubMenu,
                    icon: undefined,
                    children: [
                        {
                            title: 'raw',
                            type: SubMenuType.MenuItem,
                            icon: undefined,
                            children: undefined,
                            callback: 'MENU_CHANNEL#data.add.raw',
                            params: undefined
                        },
                        {
                            title: 'UDX',
                            type: SubMenuType.MenuItem,
                            icon: undefined,
                            children: undefined,
                            callback: 'MENU_CHANNEL#data.add.UDX',
                            params: undefined
                        }
                    ],
                    callback: undefined,
                    params: undefined
                },
                {
                    title: 'refactor',
                    type: SubMenuType.MenuItem,
                    icon: undefined,
                    children: undefined,
                    callback: 'MENU_CHANNEL#data.refactor',
                    params: undefined
                },
                {
                    title: 'visualization',
                    type: SubMenuType.MenuItem,
                    icon: undefined,
                    children: undefined,
                    callback: 'MENU_CHANNEL#data.visualization',
                    params: undefined
                }
            ];
        } else if (type === ContextMenuType.DATAITEM) {
            return [
                {
                    title: 'download',
                    type: SubMenuType.MenuItem,
                    icon: undefined,
                    children: undefined,
                    callback: 'DATA_CHANNEL#data.download',
                    params: geoData
                }
            ];
        }
    }

    getDataInfo(params, query, body) {
        postal.channel('DATA_INQUIRE_CHANNEL').publish('data.inquire.get', {
            serviceId: 'getDataInfo',
            callback: 'MODEL_TOOL_CHANNEL#getDataInfo',
            query: query,
            body: body,
            params: params
        });
    }

    downloadData(params, query, body) {
        postal.channel('DATA_INQUIRE_CHANNEL').publish('data.inquire.get', {
            serviceId: 'downloadData',
            callback: 'MODEL_TOOL_CHANNEL#downloadData',
            query: query,
            body: body,
            params: params
        });
    }
}
