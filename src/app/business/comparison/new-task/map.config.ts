import { MapToolbarItemCfg, MapToolbarCfg, MapToolBarIconType, MapToolBarItemType } from '@feature/ol-map/model/map-toolbar-config.class';

export const MAP_TOOLBAR_CONFIG: MapToolbarItemCfg[] = [
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
];