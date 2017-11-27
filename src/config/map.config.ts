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
                    },
                    {
                        "id": "4945EB65-5189-4A67-8907-262396320124",
                        "icon": "group-node",
                        "value": "行政村"
                    },
                    {
                        "id": "11646E39-2FD2-41CA-948B-19DB0496A47C",
                        "icon": "group-node",
                        "value": "板块"
                    },
                    {
                        "id": "185EAD66-0298-47ED-8DC0-C6E54126E5E8",
                        "icon": "group-node",
                        "value": "地块边线"
                    },
                    {
                        "id": "1DA8E26D-6804-4BB8-9C25-70E86C4A1674",
                        "icon": "group-node",
                        "value": "地块面"
                    }
                ]
            },
            {
                "id": "e0af6d5e-31d4-441e-a935-d94fa36ed2ef",
                "icon": "root.png",
                "value": "企业分布专题图",
                "children": [
                    {
                        "id": "6ee41b86-06bf-4f5f-8e13-c235850f8550",
                        "icon": "group-node",
                        "value": "重点排污企业分布图"
                    },
                    {
                        "id": "389237FF-F63F-4E2A-8CB4-E39E719227D8",
                        "icon": "group-node",
                        "value": "规上企业分布图"
                    },
                    {
                        "id": "72DABF88-1640-4040-A76B-8CD4365D05FC",
                        "icon": "group-node",
                        "value": "高新技术企业分布图"
                    },
                    {
                        "id": "3F3A7D9C-658A-4B84-B408-282B5816F17F",
                        "icon": "group-node",
                        "value": "超亿元企业分布图"
                    },
                    {
                        "id": "B8245527-346C-4A40-82E8-9C51B49104AD",
                        "icon": "group-node",
                        "value": "小巨人企业分布图"
                    },
                    {
                        "id": "6B19921E-6557-449D-8C98-3EEDB70480E6",
                        "icon": "group-node",
                        "value": "散乱污企业分布图"
                    }
                ]
            },
            {
                "id": "398ea4c7-7c06-4fa3-9f52-548fcaa1b4d8",
                "icon": "root.png",
                "value": "板块分析专题图",
                "children": [
                    {
                        "id": "398ea4c7-7c06-4fa3-9f52-548fcaa1b4d8",
                        "icon": "root.png",
                        "value": "国有用地分析",
                        "children": [
                            {
                                "id": "ADB05BA7-202F-4BCB-B121-CB3647759CF1",
                                "icon": "group-node",
                                "value": "占地面积"
                            },
                            {
                                "id": "353ED410-5A83-45AF-B3CB-D46B2D90428B",
                                "icon": "group-node",
                                "value": "持证面积"
                            }
                        ]
                    },
                    {
                        "id": "682FAB82-2B19-47BC-AB48-357AD1F6CADA",
                        "icon": "group-node",
                        "value": "集体用地-占地面积分析"
                    },
                    {
                        "id": "A7D8C4CA-8D9D-4E5B-8AFB-CAF58DCB8295",
                        "icon": "group-node",
                        "value": "其他用地-占地面积分析"
                    },
                    {
                        "id": "398ea4c7-7c06-4fa3-9f52-548fcaa1b4d8",
                        "icon": "root.png",
                        "value": "耗电分析",
                        "children": [
                        {
                            "id": "A5DE5946-52D0-4C95-B87E-55AB9FEF9591",
                            "icon": "group-node",
                            "value": "2015年"
                        },
                        {
                            "id": "04EB66D2-4AEB-4D77-8F0F-FCDF13B1AF9E",
                            "icon": "group-node",
                            "value": "2016年"
                        },
                        {
                            "id": "91CA87EC-FE4B-437B-A557-1320398F963F",
                            "icon": "group-node",
                            "value": "2017上半年"
                        }]
                    },
                    {
                        "id": "398ea4c7-7c06-4fa3-9f52-548fcaa1b4d8",
                        "icon": "root.png",
                        "value": "亩均销售分析",
                        "children": [
                            {
                                "id": "072A7C32-EE8D-4EF5-9D1E-A1CC9585F3F3",
                                "icon": "group-node",
                                "value": "2015年"
                            },
                            {
                                "id": "B905727F-775B-41B6-9A6A-C5900DC7DEE2",
                                "icon": "group-node",
                                "value": "2016年"
                            },
                            {
                                "id": "E2EF717B-B089-44EA-8853-15CD97BCA647",
                                "icon": "group-node",
                                "value": "2017上半年"
                            }
                        ]
                    },
                    {
                        "id": "398ea4c7-7c06-4fa3-9f52-548fcaa1b4d8",
                        "icon": "root.png",
                        "value": "亩均税收分析",
                        "children": [
                            {
                                "id": "A4B13041-0C48-4798-B0D1-62E48037EE8B",
                                "icon": "group-node",
                                "value": "2015年"
                            },
                            {
                                "id": "E89B8F06-9E1A-499E-9771-D85415E08963",
                                "icon": "group-node",
                                "value": "2016年"
                            },
                            {
                                "id": "ADB9F663-6E32-454B-87AC-687475EC9B2C",
                                "icon": "group-node",
                                "value": "2017上半年"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "e0af6d5e-31d4-441e-a935-d94fa36ed2ef",
                "icon": "root.png",
                "value": "地块分析专题图",
                "children": [
                    {
                        "id": "e0af6d5e-31d4-441e-a935-d94fa36ed2ef",
                        "icon": "root.png",
                        "value": "亩均分析",
                        "children": [
                            {
                                "id": "B16849EA-CAD8-4C0B-A84A-7890A2963DE8",
                                "icon": "group-node",
                                "value": "2015年亩均销售分析"
                            },
                            {
                                "id": "E9C12D9C-49F3-4243-9D7D-E94ACC3841CD",
                                "icon": "group-node",
                                "value": "2016年亩均销售分析"
                            },
                            {
                                "id": "A465DA1A-46CB-402C-938C-153E712F049D",
                                "icon": "group-node",
                                "value": "2017年亩均销售分析"
                            },
                            {
                                "id": "F2657509-FE1E-4D7A-B16A-551B5AB95C06",
                                "icon": "group-node",
                                "value": "2015年亩均税收分析"
                            },
                            {
                                "id": "3136439D-E9C8-41BA-A81C-26AC44A1EFCA",
                                "icon": "group-node",
                                "value": "2016年亩均税收分析"
                            },
                            {
                                "id": "B40459E1-1F87-4E20-B9FD-D21696C125B1",
                                "icon": "group-node",
                                "value": "2017年亩均税收分析"
                            }
                        ]
                    },
                    {
                        "id": "107F23A3-88D0-43DB-8B7B-4A124580E160",
                        "icon": "group-node",
                        "value": "少批多用分析"
                    },
                    {
                        "id": "B0E5F659-2AE2-4C29-BD3D-FF4227D9EE70",
                        "icon": "group-node",
                        "value": "地块租赁分析"
                    }
                ]
            },
            {
                "id": "e0af6d5e-31d4-441e-a935-d94fa36ed2ef",
                "icon": "root.png",
                "value": "集体地块",
                "children": [
                    {
                        "id": "ED370B0E-003E-4CCE-A972-64243AB1E47D",
                        "icon": "group-node",
                        "value": "太平聚金村"
                    },
                    {
                        "id": "040E44C2-1A1E-49E9-A21E-6D69FCED5429",
                        "icon": "group-node",
                        "value": "黄埭长康社区"
                    },
                    {
                        "id": "0BD38080-CA62-4652-A054-A1D363A3DD62",
                        "icon": "group-node",
                        "value": "北桥鹅东村"
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
        },
        {
            "aid": "6ee41b86-06bf-4f5f-8e13-c235850f8550",
            "name": "重点排污企业",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        11
                    ]
                }
            ]
        },
        {
            "aid": "389237FF-F63F-4E2A-8CB4-E39E719227D8",
            "name": "规上企业",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        10
                    ]
                }
            ]
        },
        {
            "aid": "72DABF88-1640-4040-A76B-8CD4365D05FC",
            "name": "高新技术企业",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        9
                    ]
                }
            ]
        },
        {
            "aid": "3F3A7D9C-658A-4B84-B408-282B5816F17F",
            "name": "超亿元企业",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        8
                    ]
                }
            ]
        },
        {
            "aid": "B8245527-346C-4A40-82E8-9C51B49104AD",
            "name": "小巨人企业",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        7
                    ]
                }
            ]
        },
        {
            "aid": "ADB05BA7-202F-4BCB-B121-CB3647759CF1",
            "name": "国有占地面积",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        7
                    ]
                }
            ]
        },
        {
            "aid": "353ED410-5A83-45AF-B3CB-D46B2D90428B",
            "name": "国有出让",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        1
                    ]
                }
            ]
        },
        {
            "aid": "682FAB82-2B19-47BC-AB48-357AD1F6CADA",
            "name": "集体出让",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        2
                    ]
                }
            ]
        },
        {
            "aid": "A7D8C4CA-8D9D-4E5B-8AFB-CAF58DCB8295",
            "name": "其他用地",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        3
                    ]
                }
            ]
        },
        {
            "aid": "A5DE5946-52D0-4C95-B87E-55AB9FEF9591",
            "name": "少批多用",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        4
                    ]
                }
            ]
        },
        {
            "aid": "072A7C32-EE8D-4EF5-9D1E-A1CC9585F3F3",
            "name": "租赁情况（一地多企）",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        5
                    ]
                }
            ]
        },
        {
            "aid": "B905727F-775B-41B6-9A6A-C5900DC7DEE2",
            "name": "板块_销售2015",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        13
                    ]
                }
            ]
        },
        {
            "aid": "E2EF717B-B089-44EA-8853-15CD97BCA647",
            "name": "板块_销售2016",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        14
                    ]
                }
            ]
        },
        {
            "aid": "A4B13041-0C48-4798-B0D1-62E48037EE8B",
            "name": "板块_销售2017上",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        15
                    ]
                }
            ]
        },
        {
            "aid": "E89B8F06-9E1A-499E-9771-D85415E08963",
            "name": "行政村_销售2015",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        16
                    ]
                }
            ]
        },
        {
            "aid": "ADB9F663-6E32-454B-87AC-687475EC9B2C",
            "name": "行政村_销售2016",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        17
                    ]
                }
            ]
        },
        {
            "aid": "B16849EA-CAD8-4C0B-A84A-7890A2963DE8",
            "name": "行政村_销售2017",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        18
                    ]
                }
            ]
        },
        {
            "aid": "E9C12D9C-49F3-4243-9D7D-E94ACC3841CD",
            "name": "地块_销售2015",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        19
                    ]
                }
            ]
        },
        {
            "aid": "A465DA1A-46CB-402C-938C-153E712F049D",
            "name": "地块_销售2016",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        20
                    ]
                }
            ]
        },
        {
            "aid": "F2657509-FE1E-4D7A-B16A-551B5AB95C06",
            "name": "地块_销售2017",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        21
                    ]
                }
            ]
        },
        {
            "aid": "3136439D-E9C8-41BA-A81C-26AC44A1EFCA",
            "name": "地块_亩均销售2015",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        22
                    ]
                }
            ]
        },
        {
            "aid": "B40459E1-1F87-4E20-B9FD-D21696C125B1",
            "name": "地块_亩均销售2016",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        23
                    ]
                }
            ]
        },
        {
            "aid": "107F23A3-88D0-43DB-8B7B-4A124580E160",
            "name": "地块_亩均销售2017",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        24
                    ]
                }
            ]
        },
        {
            "aid": "B0E5F659-2AE2-4C29-BD3D-FF4227D9EE70",
            "name": "板块_税收2015",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        26
                    ]
                }
            ]
        },
        {
            "aid": "ED370B0E-003E-4CCE-A972-64243AB1E47D",
            "name": "板块_税收2016",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        27
                    ]
                }
            ]
        },
        {
            "aid": "040E44C2-1A1E-49E9-A21E-6D69FCED5429",
            "name": "板块_税收2017",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        28
                    ]
                }
            ]
        },
        {
            "aid": "0BD38080-CA62-4652-A054-A1D363A3DD62",
            "name": "行政村_税收2015",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        29
                    ]
                }
            ]
        },
        {
            "aid": "42C735E3-1BE2-49C0-9B27-A81AFD0ABA0A",
            "name": "行政村_税收2016",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        30
                    ]
                }
            ]
        },
        {
            "aid": "11646E39-2FD2-41CA-948B-19DB0496A47C",
            "name": "行政村_税收2017",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        31
                    ]
                }
            ]
        },
        {
            "aid": "4945EB65-5189-4A67-8907-262396320124",
            "name": "地块_税收2015",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        32
                    ]
                }
            ]
        },
        {
            "aid": "04EB66D2-4AEB-4D77-8F0F-FCDF13B1AF9E",
            "name": "地块_税收2016",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        33
                    ]
                }
            ]
        },
        {
            "aid": "91CA87EC-FE4B-437B-A557-1320398F963F",
            "name": "地块_税收2017",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        34
                    ]
                }
            ]
        },
        {
            "aid": "6B19921E-6557-449D-8C98-3EEDB70480E6",
            "name": "地块_亩均税收2015",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        35
                    ]
                }
            ]
        },
        {
            "aid": "185EAD66-0298-47ED-8DC0-C6E54126E5E8",
            "name": "地块_税收2016",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        36
                    ]
                }
            ]
        },
        {
            "aid": "1DA8E26D-6804-4BB8-9C25-70E86C4A1674",
            "name": "地块_税收2017",
            "layers": [
                {
                    "id": "d7c83585-ca05-451f-a834-22a3e359127c",
                    "index": 0,
                    "vls": [
                        37
                    ]
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