export class MapToolbarItemCfg {
    id: string;
    name: string;
    callback: string;                                           // channel#topic
    load: boolean;                  
    params?: any;
    icon?: string;                                               // postal附加的参数
    desc?: string;
    children?: MapToolbarItemCfg[];                             // 复合工具栏
}

export type MapToolbarCfg = MapToolbarItemCfg[];