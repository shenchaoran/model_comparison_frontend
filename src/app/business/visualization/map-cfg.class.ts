import { GeoData } from '../main-window/component/data-list/geo-data';

export class NJMap {
    guid: string;
    name: string;
    layers: Array<NJLayer>;
}

export class NJLayer {
    geodata: GeoData;
    // ...
}