import { LAYER_TYPE } from '@common/feature/ol-map/models/layer-type.enum';

export class Layer {
    id: string;
    type: LAYER_TYPE;
    display: boolean;
    projection: string;
}