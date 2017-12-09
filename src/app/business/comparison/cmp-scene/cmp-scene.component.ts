import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CmpSceneService } from '../services/cmp-scene.service';

@Component({
    selector: 'ogms-cmp-scene',
    templateUrl: './cmp-scene.component.html',
    styleUrls: ['./cmp-scene.component.scss']
})
export class CmpSceneComponent implements OnInit {
    tabs: Array<{
        id: string;
        name: string;
        data: any;
    }>;
    constructor(
        private service: CmpSceneService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.data.subscribe(resolveData => {
            this.tabs = resolveData.sceneTabTree;
        });
    }
}
