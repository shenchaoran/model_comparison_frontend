import { Injectable } from '@angular/core';
import { RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resolve, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ErrorHandle } from './../../../common/core/base/error-handle';
import {
    SubMenuType,
    SubMenu
} from '../../../common/shared/components/context-menu/sub-menu';
import { GeoData } from '../component/data-list/geo-data';
import { DataInquireService } from '../../../common/core/services/data.inquire.service';

export enum ContextMenuType {
    BLACK = 1,
    DATAITEM = 2
}


@Injectable()
export class DataListService extends ErrorHandle {
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private dataInquireService: DataInquireService
    ) {
        super();
    }

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

    parseUDX(gdid: string): Observable<any> {
        const url = this.dataInquireService.getServiceById('parseUDX', {id: gdid});
        console.log('get: ' + url);
        const options = undefined;
        return this.http.get(url, options);
    }
}
