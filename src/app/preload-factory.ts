import { SchemaService } from '@services';

export default function initFactory (provider: SchemaService) {
    return () => provider.loadSchemas()
}