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
import { UDXTableXML } from '../models/UDX.type.model';
import { TreeItem } from '../component/visual-list/tree-item.class';
import { TreeItemType } from '../component/visual-list/tree-item-type.enum';
import { MenuItem } from '../component/visual-list/menu-item.class';

export enum ContextMenuType {
    BLANK = 1,
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
    ): Array<TreeItem> {
        if (type === ContextMenuType.BLANK) {
            return [
                {
                    id: 'add',
                    label: 'Add',
                    items: [],
                    data: {
                        postalInfo: 'MENU_CHANNEL#data.add.raw',
                        params: undefined
                    }
                    // items: [
                    //     {
                    //         id: 'add-raw',
                    //         label: 'Raw',
                    //         items: [],
                    //         data: {
                    //             postalInfo: 'MENU_CHANNEL#data.add.raw',
                    //             params: undefined
                    //         }
                    //     },
                    //     {
                    //         id: 'add-UDX',
                    //         label: 'UDX',
                    //         items: [],
                    //         data: {
                    //             postalInfo: 'MENU_CHANNEL#data.add.UDX',
                    //             params: undefined
                    //         }
                    //     }
                    // ],
                    // data: undefined
                },
                {
                    id: 'refactor',
                    label: 'Refactor',
                    items: [],
                    data: {
                        postalInfo: 'MENU_CHANNEL#data.refactor',
                        params: undefined
                    }
                },
                {
                    id: 'visualization',
                    label: 'Visualization',
                    items: [],
                    data: {
                        postalInfo: 'MENU_CHANNEL#data.visualization',
                        params: undefined
                    }
                }
            ];
        } else if (type === ContextMenuType.DATAITEM) {
            return [
                {
                    id: 'close',
                    label: 'Close',
                    items: [],
                    data: {
                        postalInfo: 'DATA_CHANNEL#data.close',
                        params: geoData
                    }
                },
                {
                    id: 'download',
                    label: 'Save as',
                    items: [],
                    data: {
                        postalInfo: 'DATA_CHANNEL#data.download',
                        params: geoData
                    }
                },
                {
                    id: 'prop',
                    label: 'Property',
                    items: [],
                    data: {
                        postalInfo: 'DATA_CHANNEL#data.property',
                        params: geoData
                    }
                },
                {
                    id: 'show',
                    label: 'Show',
                    items: [],
                    data: {
                        postalInfo: 'DATA_CHANNEL#data.show',
                        params: geoData
                    }
                }
            ];
        }
    }

    parseUDXProp(_id: string): Observable<any> {
        const url = this.dataInquireService.getServiceById('parseUDXProp', {
            id: _id
        });
        const options = undefined;
        return this.http.get(url, options);
    }

    showUDX(_id: string): Observable<any> {
        const url = this.dataInquireService.getServiceById('showUDX', {
            id: _id
        });
        const options = undefined;
        return this.http.get(url, options);
    }

    _hotTableSettingsAdapter(udxTable: UDXTableXML) {

    }

    // downloadUDX(url: string) {
    //     this.http
    //             .get(url, {
    //                 responseType: 'text'
    //             })
    //             .subscribe(event => {
    //                 console.log(event);
    //             }, this.handleError);
    // }

    compareUDX(left: GeoData, right: GeoData): Observable<any> {
        const url = this.dataInquireService.getServiceById('compareUDX', {
            left: left._id,
            right: right._id
        });
        const options = undefined;
        return this.http.get(url, options);
    }
}
