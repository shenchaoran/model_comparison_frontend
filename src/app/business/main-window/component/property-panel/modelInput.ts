import { GeoData } from './../data-list/geo-data';

// 模型调用相关，EventMetaInfo中保存了input 和output
export class ModelInput {
    states: Array<{
        $: StateMetaInfo,
        inputs: Array<EventMetaInfo>,
        outputs: Array<EventMetaInfo>
    }>;
    schemas: any;
    // ms info storage cache
    msid?: string;
    msname?: string;
}

class EventMetaInfo {
    name: string;
    type: string;
    optional: number;
    description: string;
    schema: string;

    geodata?: GeoData;  // input data storage cache
    filename?: string;  // output data storage cache
}

class StateMetaInfo {
    id: string;
    name: string;
    type: string;
    description: string;
}