import { MAP_TYPE } from './map-component-type.enum';
import { Layer } from './layer.class';

export class Map {
    id: string;
    type: MAP_TYPE;
    layers: Layer[];
}