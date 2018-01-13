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

// 常用图层配置
export const MAP_LAYERS = [
    {
        id: 'draw.point',
        type: 'overlay',
        title: ''
    },
    {
        id: 'draw.polyline',
        type: 'overlay',
        title: ''
    },
    {
        id: 'draw.polygon',
        type: 'overlay',
        title: ''
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









// region deprecated
export const MAP_LAYERSTREE_CONFIG = [
    {
        "id": "baseLayer",
        "icon": "root.png",
        "value": "基础底图",
        "children": [
            {
                "id": "573e959c-d819-4b88-ace5-3a5e79babf6f",
                "icon": "./assets/img/thumb/baseLayer/a.png",
                "value": "电子底图",
                "children": []
            }
        ]
    },
    {
        "id": "imageLayer",
        "icon": "root.png",
        "value": "影像数据",
        "children": [
            {
                "id": "24d1898b-9747-4c09-a558-0d819c627d24",
                "icon": "./assets/img/thumb/imageLayer/g.png",
                "value": "2017遥感影像"
            },
            {
                "id": "34d1898b-9747-4c09-a558-0d819c627d24",
                "icon": "./assets/img/thumb/imageLayer/g.png",
                "value": "2016遥感影像"
            },
            {
                "id": "44d1898b-9747-4c09-a558-0d819c627d24",
                "icon": "./assets/img/thumb/imageLayer/g.png",
                "value": "2015遥感影像"
            }
        ]
    },
    {
        "id": "layersTree",
        "icon": "root.png",
        "value": "root",
        "children": [
            {
                "id": "e0af6d5e-31d4-441e-a935-d94fa36ed2ef",
                "icon": "root.png",
                "value": "基础数据",
                "children": [
                    {
                        "id": "42C735E3-1BE2-49C0-9B27-A81AFD0ABA0A",
                        "icon": "group-node",
                        "value": "村边界"
                    }
                ]
            }
        ]
    }
]

export const MAP_CONFIG = {
    "mapinfo": {
        "extent": {
            "xmin": 41940,
            "ymin": 52042,
            "xmax": 62620,
            "ymax": 65722
        },
        "spatialReference": "Suzhou_1954_3_Degree_GK_CM_120E"
    },
    "defaultlayers": [
        {
            "aid": "573e959c-d819-4b88-ace5-3a5e79babf6f",
            "isbase": true
        }
    ],
    "layers": [
        {
            "id": "78c24ce5-1d5f-419f-a470-38a280ddb072",
            "name": "电子底图",
            "type": "esri-tiledlayer",
            "tokenid": "token_xc",
            "url": "http://223.112.99.245:5000/xcscms/sipsd/service/TileService/DZDT/MapServer",
            "des": ""
        },
        {
            "id": "78c24ce5-1d5f-419f-a470-38a280ddb071",
            "name": "电子底图",
            "type": "esri-tiledlayer",
            "tokenid": "",
            "url": "http://cityfun.iok.la/arcgis/rest/services/XCIE/BaseMapGray20170926/MapServer",
            "des": ""
        },
        {
            "id": "726a3fce-c99d-4cee-aa4d-3d0123023d9f",
            "name": "2017遥感影像",
            "type": "esri-tiledlayer",
            "tokenid": "token_xc",
            "url": "http://223.112.99.245:5000/xcscms/sipsd/service/TileService/IMG2017/MapServer",
            "des": ""
        },
        {
            "id": "626a3fce-c99d-4cee-aa4d-3d0123023d9f",
            "name": "2016遥感影像",
            "type": "esri-tiledlayer",
            "tokenid": "token_xc",
            "url": "http://223.112.99.245:5000/xcscms/sipsd/service/TileService/IMG2016/MapServer",
            "des": ""
        },
        {
            "id": "526a3fce-c99d-4cee-aa4d-3d0123023d9f",
            "name": "2015遥感影像",
            "type": "esri-tiledlayer",
            "tokenid": "token_xc",
            "url": "http://223.112.99.245:5000/xcscms/sipsd/service/TileService/IMG2015/MapServer",
            "des": ""
        },
        {
            "id": "d7c83585-ca05-451f-a834-22a3e359127c",
            "name": "综合指标分析专题图集",
            "type": "esri-dynamiclayer",
            "tokenid": "token_cf",
            "url": "http://cityfun.iok.la/arcgis/rest/services/XCIE/XCIE20170926/MapServer",
            "des": ""
        }
    ],
    "alayers": [
        {
            "aid": "573e959c-d819-4b88-ace5-3a5e79babf6f",
            "name": "电子底图",
            "layers": [
                {
                    "id": "78c24ce5-1d5f-419f-a470-38a280ddb072",
                    "index": 0
                }
            ]
        },
        {
            "aid": "24d1898b-9747-4c09-a558-0d819c627d24",
            "name": "2017遥感影像",
            "layers": [
                {
                    "id": "726a3fce-c99d-4cee-aa4d-3d0123023d9f",
                    "index": 0
                }
            ]
        },
        {
            "aid": "34d1898b-9747-4c09-a558-0d819c627d24",
            "name": "2016遥感影像",
            "layers": [
                {
                    "id": "626a3fce-c99d-4cee-aa4d-3d0123023d9f",
                    "index": 0
                }
            ]
        },
        {
            "aid": "44d1898b-9747-4c09-a558-0d819c627d24",
            "name": "2015遥感影像",
            "layers": [
                {
                    "id": "526a3fce-c99d-4cee-aa4d-3d0123023d9f",
                    "index": 0
                }
            ]
        }
    ],
    "tokens": [
        {
            "id": "token_xc",
            "type": "result",
            "val": "MQYKFO3DFrMuYpKfpijOAz1WZx85gMb/7adq2Jgau5e2R3iB87/LR3gwnCCcfYb9PPKCAtu5U+tG7eAQ4zhajELTTcgU5JawDrZLOOSHv1Vrahl+fHl1Kg=="
        }, {
            "id": "token_cf",
            "type": "result",
            "val": "CODy3yJB9uoUb0qIZSQdLJOdvrg6j/lJzGFCyiyj3lWVX6xIzHnP3z7pJlEQdfy3/5rpd+r6zXIEolp31DrmGrRK8gbj07+3CQmq7F7gDs1QKCNgKgoxvQ=="
        }
    ]
}
// endregion