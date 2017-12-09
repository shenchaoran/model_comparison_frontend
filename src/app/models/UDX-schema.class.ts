/**
 * TODO 加上schema的详细结构
 */

import { ResourceSrc } from './resource.enum';

export enum ExternalName {
    TABLE_RAW,
    SHAPEFILE_RAW,
    ASCII_GRID_RAW
};

export class UDXSchema {
    src: ResourceSrc;
    externalName?: string;
    externalId?: string;
    description?: string;
    structure: any;
    private static UDX_SCHEMAS = [
        {
            src: ResourceSrc.EXTERNAL,
            externalName: ExternalName[ExternalName.TABLE_RAW],
            externalId: 'TABLE_RAW',
            description: '',
            structure: {}
        },
        {
            src: ResourceSrc.EXTERNAL,
            externalName: ExternalName[ExternalName.SHAPEFILE_RAW],
            externalId: 'SHAPEFILE_RAW',
            description: '',
            structure: {}
        },
        {
            src: ResourceSrc.EXTERNAL,
            externalName: ExternalName[ExternalName.ASCII_GRID_RAW],
            externalId: 'ASCII_GRID_RAW',
            description: '',
            structure: {}
        }
    ];

    static get schemas() {
        return UDXSchema.UDX_SCHEMAS;
    }

    static find(id: string) {
        return _.find(UDXSchema.UDX_SCHEMAS, schema => {
            return schema.externalId === id;
        });
    }
}