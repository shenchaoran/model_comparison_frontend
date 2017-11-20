import { GeoData } from '../main-window/component/data-list/geo-data';

/**
 * 后两者必有其一
 */
export class NJDiagram {
    guid: string;
    option: any;

    geodata?: GeoData;

    left?: GeoData;
    right?: GeoData;
}