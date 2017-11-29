import { MENU_LAYOUT } from '@common/layout/layout.enum';

export class AppConfigClass {
    id: string;
    name?: string;
    des?: string;
    defaultroute: string;
    layout?: MENU_LAYOUT;
}

export const APP_CONFIG = {
    appId: 'aaaa',
    name: 'WebNJGIS',
    des: 'hhhhh',
    defaultroute: 'webNJGIS',
    layout: MENU_LAYOUT.HEADER_MENU_LAYOUT
}