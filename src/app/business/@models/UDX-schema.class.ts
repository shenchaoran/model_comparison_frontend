/**
 * TODO 加上schema的详细结构
 */

import { ResourceSrc } from '@models/resource.enum';

export class UDXSchema {
    id: string;
    name: string;
    description: string;
    src: ResourceSrc;
    structure: NETCDF4_Schema & Table_Schema & Binary_Schema & Coordinate_Schama;
}

export class NETCDF4_Schema {
    type: 'NETCDF4';
    dimensions: {
        name: string,
        [key: string]: any,
    }[];
    variables: {
        name: string,
        layerId?: string,
        metricName: string,
        scale?: number,
        offset?: number,
        start?: number,
        end?: number,
        step?: number,
        unit?: string,
        dimensions?: string[],
        missing_value?: number,
    }[];
}

export class Table_Schema {
    type: 'table' | 'obs-table';
    header: number;
    skiprows: number;
    seperator: string;
    columns: {
        id: string,
        type: string,
        description: string,
        metricName: string,
        unit: string,
        scale: number,
        offset: number,
        missing_value?: number,
    }[]
}

export class Binary_Schema {
    type: 'binary';
}

export class Coordinate_Schama {
    type: 'coordinate-index';
}