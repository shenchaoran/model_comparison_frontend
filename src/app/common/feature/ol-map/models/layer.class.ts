import { LAYER_TYPE } from './layer-type.enum';

export class Layer {
    id: string;
    type: LAYER_TYPE;
    display: boolean;
    projection: string;
}