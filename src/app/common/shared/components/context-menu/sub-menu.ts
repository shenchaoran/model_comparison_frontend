export enum SubMenuType {
    SubMenu = 1,
    MenuItem = 2
}

export class SubMenu {
    type: SubMenuType;
    title: string;
    icon: string;
    children: Array<SubMenu>;
    callback: string;               // 点击响应事件: 'channel#subject'
    params?: any;                    // 发布事件的参数

    constructor() {}
}