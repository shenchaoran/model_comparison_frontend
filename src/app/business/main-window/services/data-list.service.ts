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
        const url = this.dataInquireService.getServiceById('parseUDX', {
            id: gdid
        });
        console.log('get: ' + url);
        const options = undefined;
        return this.http.get(url, options);
    }

    subscribeGetDataProp(): Promise<any> {
        return new Promise((resolve, reject) => {
            postal
                .channel('LAYOUT_CHANNEL')
                .subscribe('propertity-panel.data.show', (data, envelope) => {
                    const filename = data.filename;
                    const gdid = data.gdid;
                    this.parseUDX(data.gdid)
                        .toPromise()
                        .then(response => {
                            if (
                                _.startsWith(
                                    _.get(response, 'status.code'),
                                    '200'
                                )
                            ) {

                                const data = _.get(response, 'data');
                                _.set(data, 'gdid', gdid);
                                postal
                                    .channel('DATA_CHANNEL')
                                    .publish('propertity-panel.data.bind', data);
                                return resolve(filename);
                            } else {
                                this._notification.create(
                                    'warning',
                                    'Warning:',
                                    'parse data properties failed, please retry later!'
                                );
                            }
                        })
                        .catch(this.handleError);
                });
        });
    }

    _hotTableSettingsAdapter(udxTable: UDXTable) {

    }
}
