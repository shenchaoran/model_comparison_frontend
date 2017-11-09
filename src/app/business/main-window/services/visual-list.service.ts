import { Observable } from 'rxjs/Observable';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { HttpHeaders } from '@angular/common/http';

import { TreeItemType } from '../component/visual-list/tree-item-type.enum';
import { TreeItem } from '../component/visual-list/tree-item.class';

@Injectable()
export class VisualListService {
    constructor() {}

    getMenuConfig(treeItemType: TreeItemType): any {
        const cfg = {};
        cfg[TreeItemType.Title] = [
            {
                id: '1',
                parentid: '-1',
                label: 'Close all',
                items: []
            }
        ];
        cfg[TreeItemType.Map] = [
            {
                id: '1',
                parentid: '-1',
                label: 'Close all',
                items: []
            },
            {
                id: '2',
                parentid: '-1',
                label: 'Show',
                items: []
            }
        ];
        cfg[TreeItemType.Diagram] = [
            {
                id: '1',
                parentid: '-1',
                label: 'Close',
                items: []
            },
            {
                id: '2',
                parentid: '-1',
                label: 'Show',
                items: []
            }
        ];
        cfg[TreeItemType.Layer] = [
            {
                id: '1',
                parentid: '-1',
                label: 'Close',
                items: []
            }
        ];
        return cfg[treeItemType];
    }
}
