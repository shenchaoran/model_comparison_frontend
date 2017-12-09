/**
 * 
 */

import { UDXSchema } from './UDX-schema.class';

import { ResourceSrc } from './resource.enum';

export class UDXCfg {
    entrance: string;
    entries?: Array<string>;
    format?: string;
    schema$: UDXSchema;
}