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
        "title": "查询",
        "publish": "MAP_CHANNEL#map.mapClick",
        "callback": "MAP_INQUIRE_CHANNEL#map.identifyQuery"
    },
    {
        "id": "clearGraphics",
        "title": "清除",
        "publish": "MAP_CHANNEL#map.clearGraphics"
    }
];
