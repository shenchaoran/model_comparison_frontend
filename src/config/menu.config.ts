// 图标库使用的是zorro的
export class MenuClass {
    path: string;
    data?: {
        menu: {
            title: string;
            id?: string;
            icon?: string;
            selected?: boolean;
            expanded?: boolean;
            order?: number;
        };
    };
    children?: Array<MenuClass>;
}


export const MENUS: MenuClass[] = [
    {
        path: 'webNJGIS',
        children: [
            {
                path: 'home',
                data: {
                    menu: {
                        title: 'Home',
                        id: 'home',
                        icon: 'home',
                        selected: true,
                        expanded: false,
                        order: 0
                    }
                }
            },
            {
                path: 'model',
                data: {
                    menu: {
                        title: 'Model',
                        id: 'model',
                        icon: 'appstore-o',
                        selected: true,
                        expanded: false,
                        order: 0
                    }
                },
                children: [
                    {
                        path: 'main-window',
                        data: {
                            menu: {
                                title: 'main-window'
                            }
                        }
                    }
                ]
            },
            {
                path: 'std-data-set',
                data: {
                    menu: {
                        title: 'Data',
                        id: 'data',
                        icon: 'appstore-o',
                        selected: true,
                        expanded: false,
                        order: 0
                    }
                },
                children: [
                    {
                        path: 'std-data-set',
                        data: {
                            menu: {
                                title: 'standard data set'
                            }
                        }
                    },
                    {
                        path: 'data-processor',
                        data: {
                            menu: {
                                title: 'data processor'
                            }
                        }
                    }
                ]
            },
            {
                path: 'comparation',
                data: {
                    menu: {
                        title: 'Comparation',
                        id: 'comparation',
                        icon: 'appstore-o',
                        selected: true,
                        expanded: false,
                        order: 0
                    }
                },
                children: [
                    {
                        path: 'cmp-solution',
                        data: {
                            menu: {
                                title: 'comparation solution'
                            }
                        }
                    },
                    {
                        path: 'cmp-example',
                        data: {
                            menu: {
                                title: 'comparation example'
                            }
                        }
                    },
                    {
                        path: 'start-cmp',
                        data: {
                            menu: {
                                title: 'start comparation'
                            }
                        }
                    }
                ]
            }
        ]
    }
];
