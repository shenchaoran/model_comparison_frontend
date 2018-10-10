/**
 * 
 */

import { UDXSchema } from '@models/UDX-schema.class';

import { ResourceSrc } from '@models/resource.enum';

export class UDXCfg {
    entrance?: string;
    entries?: string[];
    desc?: string;
    schema$?: UDXSchema;
}