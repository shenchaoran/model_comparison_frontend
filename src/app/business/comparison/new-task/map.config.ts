import { MapToolbarItemCfg, MapToolbarCfg, TOOLBAR_POSITION, MapToolBarIconType, MapToolBarItemType } from '@feature/ol-map/models/map-toolbar-config.class';
import { MapModuleCfg } from '@feature/ol-map/models/map-module-config.class';

export const MAP_TOOLBAR_CONFIG: MapToolbarCfg = {
    load: true,
    position: TOOLBAR_POSITION.topLeft,
    itemCfg: [
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