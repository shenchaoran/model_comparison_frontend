import { GeoData } from '../main-window/component/data-list/geo-data';

export class NJTable {
    geodata: GeoData;
    hotTableCfg: {
        loading: boolean;
        instance: string;
        settings: any;
        cols: Array<{
            data: string;
            title: string;
            type?: string;
        }>;
        data: Array<any>;
        contextMenu: any;
    } = {
        loading: true,
        instance: null,
        settings: {
            afterLoadData: firstLoad => {
                if (!firstLoad) {
                    this.hotTableCfg.loading = false;
                }
            }
        },
        cols: null,
        data: null,
        contextMenu: null,
    };

    constructor() {}
}