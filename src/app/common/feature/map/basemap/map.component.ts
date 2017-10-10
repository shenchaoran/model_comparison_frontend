import { Component, ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';

import { ModulesConfigService } from '../../../core/services/modules.config.service';

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styles: []
})

export class Map {
    mapId: string = 'map';

    moduleEncode: string = 'mapmodule';
    childrenModules: any;
    // show: false;

    constructor(private modulesConfigService: ModulesConfigService) {
        // postal.channel('MAP_TREE').subscribe('menu.isCollapsed', (data, envelope) => {
        //     this.isMenuCollapsed = data.isCollapsed;
        // });
    }

    ngOnInit() {
        this.childrenModules = this.modulesConfigService.getChildrenModules(this.moduleEncode);
    }

    includesModule(moduleEncode) {
        return _.includes(this.childrenModules, moduleEncode);
    }
}
