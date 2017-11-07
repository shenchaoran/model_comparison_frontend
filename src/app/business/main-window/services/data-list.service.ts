import { Injectable } from '@angular/core';
import { RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resolve, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NzNotificationService } from 'ng-zorro-antd';

import { ErrorHandle } from './../../../common/core/base/error-handle';
import {
    SubMenuType,
    SubMenu
} from '../../../common/shared/components/context-menu/sub-menu';
import { GeoData } from '../component/data-list/geo-data';
import { DataInquireService } from '../../../common/core/services/data.inquire.service';
import { UDXTable } from '../models/UDX.type.model';

export enum ContextMenuType {
    BLACK = 1,
    DATAITEM = 2
}

@Injectable()
export class DataListService extends ErrorHandle {
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private dataInquireService: DataInquireService,
        private _notification: NzNotificationService
    ) {
        super();
    }

    getContextMenuCfg(
        type: ContextMenuType,
        geoData?: GeoData
    ): Array<SubMenu> {
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
                    title: 'Close',
                    type: SubMenuType.MenuItem,
                    icon: undefined,
                    children: undefined,
                    callback: 'DATA_CHANNEL#data.close',
                    params: geoData
                },
                {
                    title: 'Save as',
                    type: SubMenuType.MenuItem,
                    icon: undefined,
                    children: undefined,
                    callback: 'DATA_CHANNEL#data.download',
                    params: geoData
                },
                {
                    title: 'Property',
                    type: SubMenuType.MenuItem,
                    icon: undefined,
                    children: undefined,
                    callback: 'DATA_CHANNEL#data.property',
                    params: geoData
                },
                {
                    title: 'Show',
                    type: SubMenuType.MenuItem,
                    icon: undefined,
                    children: undefined,
                    callback: 'DATA_CHANNEL#data.show',
                    params: geoData
                }
            ];
        }
    }

    parseUDXProp(gdid: string): Observable<any> {
        const url = this.dataInquireService.getServiceById('parseUDXProp', {
            id: gdid
        });
        const options = undefined;
        return this.http.get(url, options);
    }

    showUDX(gdid: string): Observable<any> {
        const url = this.dataInquireService.getServiceById('showUDX', {
            id: gdid
        });
        const options = undefined;
        return this.http.get(url, options);
    }

    _hotTableSettingsAdapter(udxTable: UDXTable) {

    }
}
