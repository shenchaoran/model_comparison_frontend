/**
 * 
 */

import { UDXSchema } from './UDX-schema.class';

import { ResourceSrc } from './resource.enum';

export class UDXCfg {
    entrance?: string;
    entries?: string[];
    desc?: string;
    schema$?: UDXSchema;
}