/**
 * 
 */

import { UDXSchema } from './UDX-schema.class';

import { ResourceSrc } from './resource.enum';

export class UDXCfg {
    elements?: {
        entrance: string,
        entries: string[]
    };
    meta: {
        desc?: string,
        isExample: boolean,
        isOutput: boolean,
        spatial?: {
            dimension: 'point' | 'polygon' | 'multi-point',
            point?: any,
            polygon?: any,
            multiPoint?: any
        },

        // point
        temporal: {
            start: string,
            end: string,
            scale: 'YEAR' | 'DAY'
        },

        // polygon
        feature?: string
    };
    schema$?: UDXSchema;
}