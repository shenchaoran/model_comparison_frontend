export class MapConfigClass {
    id: string;
    encode: string;
    name: string;
    children: Array<MapConfigClass>;
}

export class MapFunctionsClass {
    MAP_FUNCTIONS_CONFIG = [
        {
            id: 'toolbar',
            functions: [
                {
                    id: '29c5663e-6a97-4007-841a-425e9cbe9f20',
                    encode: 'fullExtent',
                    name: '全图',
                    children: []
                },
                {
                    id: '9cbca27b-0449-4708-b23a-0222fe87526b',
                    encode: 'zoomIn',
                    name: '放大',
                    children: []
                },
                {
                    id: '1c74d1ff-995d-4afd-a48e-770fcb999451',
                    encode: 'zoomOut',
                    name: '缩小',
                    children: []
                },
                {
                    id: '942b4704-86ee-49f8-bb3e-59ecacefca7b',
                    encode: 'pan',
                    name: '平移',
                    children: []
                },
                {
                    id: '5302c712-6ae0-49ee-8b83-ff961bf19212',
                    encode: 'measureLength',
                    name: '测量距离',
                    children: []
                },
                {
                    id: '61e87a16-1d21-4792-88a1-f4963d94359a',
                    encode: 'measureArea',
                    name: '测量面积',
                    children: []
                },
                {
                    id: '0b98c13d-0f88-4d31-97fb-a15a31fd3a32',
                    encode: 'draw',
                    name: '绘制',
                    children: [
                        {
                            id: 'd58ae94c-98e6-451b-9ca0-8b7a8306e30e',
                            encode: 'drawPoint',
                            name: '绘点',
                            children: []
                        },
                        {
                            id: '9b71d37a-2821-4f22-a195-3b4aa5df60e4',
                            encode: 'drawPolyline',
                            name: '绘线',
                            children: []
                        },
                        {
                            id: 'b421834d-3578-46cf-91be-670215591d37',
                            encode: 'drawPolygon',
                            name: '绘面',
                            children: []
                        }
                    ]
                },
                {
                    id: 'fae57ed8-c3df-461f-a853-612b7f19a5d8',
                    encode: 'identifyQuery',
                    name: 'i查询',
                    children: []
                },
                {
                    id: 'c5afbb6b-adbc-4209-9180-129afe141a91',
                    encode: 'buildingQuery',
                    name: '楼盘表',
                    children: []
                },
                {
                    id: 'f04890c9-6940-47d9-a1a2-22fe9d569ebd',
                    encode: 'swipeMap',
                    name: '拉窗对比',
                    children: []
                },
                {
                    id: '2cb68d45-a8fe-4905-8f11-31966f642251',
                    encode: 'compareMap',
                    name: '双窗对比',
                    children: []
                },
                {
                    id: 'd165c48f-a658-47d7-afc0-c4d552dd64b8',
                    encode: 'clearGraphics',
                    name: '清除',
                    children: []
                },
                {
                    id: '82e30251-fb3f-40db-94e2-7b2e7875e5af',
                    encode: 'select',
                    name: '选择',
                    children: [
                        {
                            id: '0092630c-24bb-4768-ac65-90a70c598566',
                            encode: 'selectCircle',
                            name: '圆形',
                            children: []
                        },
                        {
                            id: '24ff9601-fecf-4922-8a52-f27e51689d8a',
                            encode: 'selectRectangle',
                            name: '矩形',
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            id: '9405CA69-05ED-4256-83C3-12D356B11E50',
            functions: [
                {
                    id: '1d2a2d26-905b-4d66-8ab7-83cd2d035a5a',
                    encode: 'homepage',
                    name: '首页',
                    children: []
                },
                {
                    id: '5c5dcfe1-4633-47a6-8ddd-f980c6ab9d25',
                    encode: 'assetsSearch',
                    name: '资产查询',
                    children: []
                },
                {
                    id: 'b34e05ee-5230-43e6-98d7-600d2699fe10',
                    encode: 'corporateInfor',
                    name: '法人信息',
                    children: []
                },
                {
                    id: '5127e6ed-5bd2-4b93-928c-757a159583b4',
                    encode: 'populationSearch',
                    name: '人口查询',
                    children: []
                },
                {
                    id: '0267a52b-ef60-43fd-a609-1257916d9444',
                    encode: 'businessStatistics',
                    name: '业务统计',
                    children: [
                        {
                            id: 'b96eca81-85f4-4da5-be9f-9f6fb1a47f49',
                            encode: 'planingUseLand',
                            name: '规划用地',
                            children: []
                        },
                        {
                            id: '795baaa8-69ae-4671-ae66-941561f476f2',
                            encode: 'demolitionData',
                            name: '拆迁数据',
                            children: []
                        },
                        {
                            id: '95f929a8-303e-4387-9747-36f53c422d5a',
                            encode: 'corporateData',
                            name: '企业数据',
                            children: []
                        },
                        {
                            id: '5de183d3-b5b9-4a41-b7d6-2619eed3a602',
                            encode: 'assetsData',
                            name: '资产数据',
                            children: []
                        },
                        {
                            id: 'dc919dfe-e7dd-4f3c-ab43-b295b78bf34c',
                            encode: 'populationData',
                            name: '人口数据',
                            children: []
                        }
                    ]
                }
            ]
        }
    ];
    getMapFuns(id: string) {
        return _.chain(this.MAP_FUNCTIONS_CONFIG)
            .find(item => {
                return item.id === id;
            })
            .pick('functions')
            .value();
    }
}

export class FunctionItemClass {
    id: string;
    encode: string;
    name: string;
    children: FunctionItemClass;
}

export const MAP_MODULE_CONFIG = [
    {
        id: 'toolbar',
        encode: 'toolbar',
        name: '工具条',
        children: []
    },
    {
        id: 'map',
        encode: 'map',
        name: '地图',
        children: []
    },
    {
        id: 'layerstree',
        encode: 'layerstree',
        name: '图层树',
        children: []
    }
];

export const MAP_TOOLBAR_CONFIG = [
    {
        "id": "fullExtent",
        "title": "全图",
        "publish": "MAP_CHANNEL#map.fullExtent"
    },
    {
        "id": "zoomIn", 
        "title": "放大",
        "publish": "MAP_CHANNEL#map.zoomIn"
    },
    {
        "id": "zoomOut", 
        "title": "缩小",
        "publish": "MAP_CHANNEL#map.zoomOut"
    },
    {
        "id": "pan",
        "title": "平移",
        "publish": "MAP_CHANNEL#map.pan"
    },
    {
        "id": "measureLength",
        "title": "测量距离",
        "publish": "MAP_CHANNEL#map.measureLength"
    },
    {
        "id": "measureArea",
        "title": "测量面积",
        "publish": "MAP_CHANNEL#map.measureArea"
    },
    {
        "id": "identifyQuery",
        "title": "i查询",
        "publish": "MAP_CHANNEL#map.mapClick",
        "callback": "MAP_INQUIRE_CHANNEL#map.identifyQuery"
    },
    {
        "id": "clearGraphics",
        "title": "清除",
        "publish": "MAP_CHANNEL#map.clearGraphics"
    }
];

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