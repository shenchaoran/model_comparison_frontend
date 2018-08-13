import { MapModuleCfg } from '@feature/ol-map/models/map-module-config.class';
import { MapToolbarItemCfg, MapToolbarCfg, MapToolBarIconType, MapToolBarItemType, TOOLBAR_POSITION } from '@feature/ol-map/models/map-toolbar-config.class';

// 配置地图加载的模块，包括：工具栏、图例、图层树、主地图
export const MAP_MODULES_CONFIG: MapModuleCfg[] = [
    {
        id: 'toolbar',
        name: '工具条',
        load: true
    },
    {
        id: 'map',
        name: '地图',
        load: true
    },
    {
        id: 'layerstree',
        name: '图层树',
        load: false
    },
    {
        id: 'legend',
        name: '图例',
        load: false
    },
    {
        id: 'source',
        name: '数据源',
        load: false
    }
];


// 配置地图工具栏选项
export const MAP_TOOLBAR_CONFIG: MapToolbarCfg = {
    load: true,
    position: TOOLBAR_POSITION.top,
    itemCfg: [
        {
            id: "fullExtent",
            name: "全图",
            topic: "map.fullExtent",
            load: true,
            type: MapToolBarItemType.BUTTON,
            icon: {
                type: MapToolBarIconType.FONTAWESOME,
                value: ''
            }
        },
        {
            id: "zoomIn", 
            name: "放大",
            topic: "map.zoomIn",
            load: true,
            type: MapToolBarItemType.BUTTON,
            icon: {
                type: MapToolBarIconType.FONTAWESOME,
                value: 'plus'
            }
        },
        {
            id: "zoomOut", 
            name: "缩小",
            topic: "map.zoomOut",
            load: true,
            type: MapToolBarItemType.BUTTON,
            icon: {
                type: MapToolBarIconType.FONTAWESOME,
                value: 'minus'
            }
        },
        {
            id: "pan",
            name: "平移",
            topic: "map.pan",
            load: false,
            type: MapToolBarItemType.TOGGLE,
            activated: false,
            icon: {
                type: MapToolBarIconType.FONTAWESOME,
                value: ''
            }
        },
        {
            id: "measureLength",
            name: "测量距离",
            topic: "map.measureLength",
            load: true,
            type: MapToolBarItemType.BUTTON,
            icon: {
                type: MapToolBarIconType.FONTAWESOME,
                value: ''
            }
        },
        {
            id: "measureArea",
            name: "测量面积",
            topic: "map.measureArea",
            load: true,
            type: MapToolBarItemType.BUTTON,
            icon: {
                type: MapToolBarIconType.FONTAWESOME,
                value: ''
            }
        },
        {
            id: "drawPoint",
            name: "画点",
            topic: "map.draw.point",
            load: true,
            type: MapToolBarItemType.BUTTON,
            icon: {
                type: MapToolBarIconType.FONTAWESOME,
                value: ''
            }
        },
        {
            id: "drawLine",
            name: "画线",
            topic: "map.draw.line",
            load: true,
            type: MapToolBarItemType.BUTTON,
            icon: {
                type: MapToolBarIconType.FONTAWESOME,
                value: ''
            }
        },
        {
            id: "drawPolygon",
            name: "画面",
            topic: "map.draw.polygon",
            load: true,
            type: MapToolBarItemType.BUTTON,
            icon: {
                type: MapToolBarIconType.FONTAWESOME,
                value: ''
            }
        },
        {
            id: "selectByCircle",
            name: "以圆形选择",
            topic: "map.select.circle",
            load: true,
            type: MapToolBarItemType.BUTTON,
            icon: {
                type: MapToolBarIconType.FONTAWESOME,
                value: ''
            }
        },
        {
            id: "selectByRectangle",
            name: "以矩形选择",
            topic: "map.select.rectangle",
            load: true,
            type: MapToolBarItemType.BUTTON,
            icon: {
                type: MapToolBarIconType.FONTAWESOME,
                value: ''
            }
        },
        {
            id: "selectByPolygon",
            name: "以矩形选择",
            topic: "map.select.polygon",
            load: true,
            type: MapToolBarItemType.BUTTON,
            icon: {
                type: MapToolBarIconType.FONTAWESOME,
                value: ''
            }
        },
        {
            id: "clearGraphics",
            name: "清除",
            topic: "map.clearGraphics",
            load: true,
            type: MapToolBarItemType.BUTTON,
            icon: {
                type: MapToolBarIconType.FONTAWESOME,
                value: ''
            }
        }
    ]
};
