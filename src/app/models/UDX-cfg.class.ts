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
        type: 'point' | 'polygon' | 'multi-point',
        isOutput: boolean,
        spatial?: {
            // point
            position?: {
                lat: string,
                long: string
            },
            // polygon
            ncols?: number,
            nrows?: number,
            yllcorner?: number,
            xllcorner?: number,
            cellsize?: number,
            NODATA_value?: number
        },

        // point
        temporal: {
            start: string,
            end: string,
            scale: 'YEAR' | 'DAY'
        },

        // polygon
        feature?: string,
        date?: string
    };
    schema$?: UDXSchema;
}