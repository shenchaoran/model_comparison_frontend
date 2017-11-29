import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as uuidv1 from 'uuid/v1';
import { jqxTreeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxtree';
import { jqxDropDownButtonComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdropdownbutton';
import { jqxMenuComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxmenu';

import { TreeItem } from './tree-item.class';
import { TreeItemType } from './tree-item-type.enum';
import { MenuItem } from './menu-item.class';
import { VisualListService } from '../../services/visual-list.service';

@Component({
    selector: 'ogms-visual-list',
    templateUrl: './visual-list.component.html',
    styleUrls: ['./visual-list.component.scss']
})
export class VisualListComponent implements OnInit, AfterViewInit {
    @ViewChild('jqTree') jqTree: jqxTreeComponent;
    @ViewChild('treeMenu') treeMenu: jqxMenuComponent;
    treeSrc: Array<TreeItem> = [
        {
            id: 'map-tree',
            // parentId: '-1',
            label: 'Map',
            items: [],
            value: TreeItemType.Title,
            expanded: true
        },
        {
            id: 'diagram-tree',
            // parentId: '-1',
            label: 'Diagram',
            items: [],
            value: TreeItemType.Title,
            expanded: true
        }
    ];
    menuSrc = [];

    constructor(private visualListService: VisualListService) {}

    ngOnInit() {
        postal
            .channel('VISUALIZATION')
            .subscribe('diagram.add', (data, envelope) => {
                let label;
                if(data.geodata) {
                    label = data.geodata.filename;
                }
                else if(data.left && data.right) {
                    label = `${data.left.filename} vs ${data.right.filename}`;
                }
                const diagramItem = new TreeItem(
                    data.guid,
                    label,
                    {},
                    TreeItemType.Diagram
                );
                this.addDiagram2Tree(diagramItem);
            });

        postal
            .channel('VISUALIZATION')
            .subscribe('map.add', (data, envelope) => {});

        postal
            .channel('VISUALIZATION')
            .subscribe('layer.add', (data, envelope) => {});
    }

    bindContextMenu() {
        document.addEventListener('contextmenu', event => {
            if ((<any>event.target).classList.contains('jqx-tree-item')) {
                event.preventDefault();
                // li tag
                this.jqTree.selectItem((<any>event.target).parentElement);
                const type = this.jqTree.getSelectedItem().value;
                // const text = (<any>(event.target)).innerHtml;
                this.menuSrc = this.visualListService.getVisualListMenuCfg(
                    parseInt(type)
                );

                let scrollTop = window.scrollY;
                let scrollLeft = window.scrollX;
                this.treeMenu.open(
                    event.clientX + 5 + scrollLeft,
                    event.clientY + 5 + scrollTop
                );
                return false;
            } else {
                this.treeMenu.close();
            }
        });
        this.jqTree.expandAll();
    }

    onMenuItemClick(event: any): void {
        let item = event.args.innerText;
        let selectedItem = this.jqTree.getSelectedItem();
        if (selectedItem != null) {
            const guid = (<any>selectedItem).id;
            const type = selectedItem.value;
            let channelName = null;
            switch (item) {
                case 'Show':
                    // this.jqTree.addTo({ label: 'Item' }, selectedItem.element);
                    if (parseInt(type) === TreeItemType.Diagram) {
                        channelName = 'diagram.show';
                    } else if (parseInt(type) === TreeItemType.Map) {
                        channelName = 'map.show';
                    }
                    postal.channel('VISUALIZATION').publish(channelName, guid);
                    break;
                case 'Close':
                    if (parseInt(type) === TreeItemType.Diagram) {
                        channelName = 'diagram.close';
                        this.removeDiagramFromTree(guid);
                    } else if (parseInt(type) === TreeItemType.Layer) {
                        channelName = 'layer.close';
                        this.removeLayerFromTree(guid);
                    }
                    postal.channel('VISUALIZATION').publish(channelName, guid);
                    break;
                case 'Close all':
                    if (parseInt(type) === TreeItemType.Title) {
                        if (guid === 'map') {
                            this.clearMapFromTree();
                            channelName = 'map.closeAll';
                        } else if (guid === 'diagram') {
                            this.clearDiagramFromTree();
                            channelName = 'diagram.closeAll';
                        }
                        this.removeDiagramFromTree(guid);
                    } else if (parseInt(type) === TreeItemType.Map) {
                        channelName = 'map.close';
                        this.removeMapFromTree(guid);
                    }
                    postal.channel('VISUALIZATION').publish(channelName, guid);
                    break;
            }
        }
    }

    ngAfterViewInit() {
        jQuery('.jqx-tree').css('border', 'none');
    }

    addDiagram2Tree(treeItem: TreeItem) {
        // const diagramEle = _
        //     .chain(this.jqTree.getItems())
        //     .find(item => item.id === 'diagram')
        //     .get('element')
        //     .value();
        // this.jqTree.addTo(treeItem, diagramEle);

        const treeSrc = _.cloneDeep(this.treeSrc);
        // 重命名
        let renamed = false;
        let i = 0;
        const orignalName = treeItem.label;
        let newName = orignalName;
        if (treeSrc[1].items.length) {
            while (!renamed) {
                if (i !== 0) {
                    newName = `${orignalName} (${i})`;
                } else {
                    newName = orignalName;
                }
                renamed = true;
                _.map(treeSrc[1].items, item => {
                    if (item.label === newName) {
                        renamed = false;
                    }
                });
                i++;
            }
        }
        treeItem.label = newName;
        // 不知为何必须要深度拷贝才行
        treeSrc[1].items.push(treeItem);
        this.treeSrc = treeSrc;
        this.jqTree.refresh();
    }

    addMap2Tree(treeItem: TreeItem) {
        // const diagramEle = _
        //                     .chain(this.jqTree.getItems())
        //                     .find(item => item.id === 'map')
        //                     .get('element')
        //                     .value();
        // this.jqTree.addTo(treeItem, diagramEle);

        const treeSrc = _.cloneDeep(this.treeSrc);
        treeSrc[0].items.push(treeItem);
        this.treeSrc = treeSrc;
        this.jqTree.refresh();
    }

    addLayer2Tree() {}

    removeDiagramFromTree(guid: string) {
        const treeSrc = _.cloneDeep(this.treeSrc);
        _.remove(treeSrc[1].items, item => item.id === guid);
        this.treeSrc = treeSrc;
    }

    removeMapFromTree(guid: string) {
        const treeSrc = _.cloneDeep(this.treeSrc);
        _.remove(treeSrc[0].items, item => item.id === guid);
        this.treeSrc = treeSrc;
    }

    removeLayerFromTree(guid: string) {
        const treeSrc = _.cloneDeep(this.treeSrc);
        const maps = treeSrc[0].items;
        _.chain(maps)
            .map(map => {
                _.remove(map.items, item => item.id === guid);
            })
            .value();
        this.treeSrc = treeSrc;
    }

    clearMapFromTree() {
        const treeSrc = _.cloneDeep(this.treeSrc);
        treeSrc[0].items = [];
        this.treeSrc = treeSrc;
    }

    clearDiagramFromTree() {
        const treeSrc = _.cloneDeep(this.treeSrc);
        treeSrc[1].items = [];
        this.treeSrc = treeSrc;
    }
}
