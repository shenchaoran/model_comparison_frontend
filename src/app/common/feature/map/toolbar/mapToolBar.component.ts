import { Component, Input, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MapFunctionsClass, MAP_TOOLBAR_CONFIG } from '@config/map.config.old';

@Component({
    selector: 'map-tool-bar',
    templateUrl: './mapToolBar.component.html',
    styleUrls: ['./mapToolBar.component.css']
})
export class MapToolBar {
    @Input()
    private mapId: string;
    @Input()
    private parentModuleEncode: string;

    private moduleEncode: string = 'toolbar';
    private moduleFunctions: any;

    toolBar: any;

    private cbSubscriptionList: Array<any>;

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        this.cbSubscriptionList = new Array<any>();
        this.toolBar = MAP_TOOLBAR_CONFIG;
    }

    ngOnInit() {
        this.moduleFunctions = MapFunctionsClass
    }

    ngAfterViewInit() {
        
    }

    includesFunctions(functionEncode) {
        return _.some(this.moduleFunctions, { "encode": functionEncode });
    }

    includesSubFunctions(parentFunctionEncode, functionEncode) {
        let parentModule = _.find(this.moduleFunctions, (item) => {
            return item.encode === parentFunctionEncode;
        });
        return _.some(parentModule.children, { "encode": functionEncode });
    }

    showSubMenu(elementId: string, show: boolean) {
        let element = jQuery('#' + elementId);

        if (show) {
            element.nextAll().removeClass('hidden');
        } else {
            element.nextAll().addClass('hidden');
        }
    }

    onClick(event, nodeConfig: any) {
        let postalChannel = _.split(nodeConfig.publish, '#')[0];
        let postalTopic = _.split(nodeConfig.publish, '#')[1];

        if (nodeConfig.callback !== undefined) {
            _.forEach(this.cbSubscriptionList, (item) => {
                postal.unsubscribe(item);
            });

            let cbChannel = _.split(nodeConfig.callback, '#')[0];
            let cbTopic = _.split(nodeConfig.callback, '#')[1];

            let subscription = postal.channel(postalChannel).subscribe(postalTopic + '.callback', (data, envelope) => {
                postal.channel(cbChannel).publish(cbTopic, data);

                postal.unsubscribe(subscription);
            });

            this.cbSubscriptionList.push(subscription);
        }

        postal.channel(postalChannel).publish(postalTopic);
    }
}
