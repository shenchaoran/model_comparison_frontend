import { MAP_TYPE } from '@common/feature/ol-map/models/map-component-type.enum';
import { Layer } from '@common/feature/ol-map/models/layer.class';

export class Map {
    id: string;
    type: MAP_TYPE;
    layers: Layer[];
}