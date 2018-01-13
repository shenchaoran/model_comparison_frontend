import { Injectable, Inject } from '@angular/core';
import { MAP_MODULES_CONFIG, MAP_TOOLBAR_CONFIG } from '@config/map.config';

@Injectable()
export class MapModuleService {
    private moduleCfg;
    private toolbarCfg;

    constructor() {}

    init(moduleCfg, toolbarCfg) {
        this.moduleCfg = moduleCfg;
        this.toolbarCfg = toolbarCfg;
    }

    // region module cfg 
    private loadSubModule(moduleId: String): boolean {
        return _.find(this.moduleCfg, item => item.id === moduleId && item.load === true) !== undefined;
    }

    loadToolbar(): boolean {
        return this.loadSubModule('toolbar');
    }

    loadLegend(): boolean {
        return this.loadSubModule('legend');
    }

    loadSource(): boolean {
        return this.loadSubModule('source');
    }
    // endregion
}
