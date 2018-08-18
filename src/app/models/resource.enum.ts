
import { Enum } from 'typescript-string-enums/dist';
/**
 * 这里认为所有的模型、数据、解决方案都是资源，都有资源的来源
 */

export const ResourceSrc = Enum(
    'INTERNAL',
    'EXTERNAL',
    'PUBLIC',
    'PRIVATE',
    'STANDARD'
);
export type ResourceSrc = Enum<typeof ResourceSrc>;