import { Injectable } from '@angular/core';

import { SubMenuType, SubMenu } from '../../../common/shared/components/right-click-menu/sub-menu';

@Injectable()
export class DataListService {
    constructor() {}

    initContextMenuCfg(): Array<SubMenu> {
        return [
            {
                title: 'add',
                type: SubMenuType.SubMenu,
                icon: undefined,
                children: [
                    {
                        title: 'raw',
                        type: SubMenuType.MenuItem,
                        icon: undefined,
                        children: undefined,
                        callback: 'MENU_CHANNEL#data.add.raw'
                    },
                    {
                        title: 'UDX',
                        type: SubMenuType.MenuItem,
                        icon: undefined,
                        children: undefined,
                        callback: 'MENU_CHANNEL#data.add.UDX'
                    }
                ],
                callback: undefined
            },
            {
                title: 'refactor',
                type: SubMenuType.MenuItem,
                icon: undefined,
                children: undefined,
                callback: 'MENU_CHANNEL#data.refactor'
            },
            {
                title: 'visualization',
                type: SubMenuType.MenuItem,
                icon: undefined,
                children: undefined,
                callback: 'MENU_CHANNEL#data.visualization'
            }
        ];
    }
}
