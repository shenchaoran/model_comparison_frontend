import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { TreeModel, NodeEvent, MoveLayerLevelEvent, ChangeLayerOpacityEvent, Ng2TreeSettings } from 'ng2-tree';
import { MAP_LAYERSTREE_CONFIG } from '@config/map.config.old';

@Component({
    selector: 'layers-tree',
    templateUrl: './mapLayersTree.component.html',
    styleUrls: ['./mapLayersTree.component.css']
})
export class LayersTree implements OnInit {
    @Input()
    private mapId: string;

    baseLayer: any;
    imageLayer: any;
    layersTree: any;

    selectedMode: string;
    selectedMap: { [mode: string]: any; } = {};

    title: string;
    height: number = 400 - 31;

    public settings: Ng2TreeSettings = {
        rootIsVisible: false
    };

    constructor(private _elementRef: ElementRef) {
        this.baseLayer = _.find(MAP_LAYERSTREE_CONFIG, function (o) { return (<any>o).id == 'baseLayer'; });
        this.imageLayer = _.find(MAP_LAYERSTREE_CONFIG, function (o) { return (<any>o).id == 'imageLayer'; });
        this.layersTree = _.find(MAP_LAYERSTREE_CONFIG, function(o) { return (<any>o).id == 'layersTree'; });

        this.layersTree.settings = {
            cssClasses: {
                expanded: 'fa fa-caret-down',
                collapsed: 'fa fa-caret-right',
                leaf: 'fa'
            }
        };
    }

    ngOnInit() {
        this.title = '图层管理树';
    }

    ngAfterViewInit(){
        
        
    }

    public onLayerModeChange(mode: string) {
        if (this.selectedMode !== mode) {
            this.selectedMode = mode;
        } else {
            this.selectedMode = null;
        }
    }

    public onChangeBaseMap(mode: string, layerAid?: string) {
        if (layerAid === undefined) {
            layerAid = this.selectedMap[mode];

        } else {
            this.selectedMap[mode] = layerAid;
        }

        if (layerAid !== undefined) {
            postal.channel('MAP_CHANNEL')
                .publish('map.changeBaseMap', { 'mapId': this.mapId, 'layerAid': layerAid });
        } else {
            this.onLayerModeChange(mode);
        }
    }

    public onSwichLayerTreeTab(): void {
        
    }

    public clearSelected() {
		postal.channel('TREE_SERVICE').publish('tree.ClearSelected');
	}

    public onNodeSelected(e: NodeEvent): void {
        postal.channel('MAP_CHANNEL')
            .publish('layers.add', { 'mapId': this.mapId, 'layerAid': (<any>e.node.node).id });

        postal.channel('MAP_INQUIRE_CHANNEL')
            .publish('identifyQueryColl.add', { 'id': (<any>e.node.node).id, 'serviceId': (<any>e.node.node).iqueryid, 'templateId': (<any>e.node.node).templateid });
    }

    public onNodeUnSelected(e: NodeEvent): void {
        postal.channel('MAP_CHANNEL')
            .publish('layers.remove', { 'mapId': this.mapId, 'layerAid': (<any>e.node.node).id });

        postal.channel('MAP_INQUIRE_CHANNEL')
            .publish('identifyQueryColl.remove', { 'id': (<any>e.node.node).id });
    }

    public onMoveLayerLevel(e: MoveLayerLevelEvent): void {
        postal.channel('MAP_CHANNEL')
            .publish('layer.moveLevel', { 'mapId': this.mapId, 'layerAid': (<any>e.node.node).id, 'level': e.level });
    }

    public onChangeLayerOpacity(e: ChangeLayerOpacityEvent): void {
        postal.channel('MAP_CHANNEL')
            .publish('layer.setOpacity', { 'mapId': this.mapId, 'layerAid': (<any>e.node.node).id, 'opacity': e.opacity });
    }
}
