export class MapToolbarItemCfg {
    id: string;
    name: string;
    load: boolean;                  
    topic: string;                                           // channel#topic
    params?: any;
    type: MapToolBarItemType;
    activated?: boolean;
    icon?: {
        type: MapToolBarIconType,
        value: string
    };                                                 // postal附加的参数
    desc?: string;
    children?: MapToolbarItemCfg[];                             // 复合工具栏
}

export enum MapToolBarIconType {
    FONTAWESOME = 0
}

export enum MapToolBarItemType {
    BUTTON = 0,
    TOGGLE
}

export type MapToolbarCfg = MapToolbarItemCfg[];