/**
 * TODO 加上schema的详细结构
 */

import { ResourceSrc } from './resource.enum';

export enum SchemaName {
    TABLE_RAW = 0,
    SHAPEFILE_RAW,
    ASCII_GRID_RAW,
    ASCII_GRID_RAW_BATCH
};

export class UDXSchema {
    id: string;
    src: ResourceSrc;
    name?: string;
    description?: string;
    structure: any[];
    semantic?: {
        concepts: any[],
        spatialRefs: any[],
        units: any[],
        dataTemplates: any[]
    };
}