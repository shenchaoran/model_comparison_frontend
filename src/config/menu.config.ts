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
            show?: boolean;
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
                path: 'geo-model',
                data: {
                    menu: {
                        title: 'Model',
                        id: 'model',
                        icon: 'appstore-o',
                        selected: true,
                        expanded: false,
                        order: 0
                    }
                }
            },
            {
                path: 'geo-data',
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
                                title: 'Standard Data Set'
                            }
                        }
                    },
                    {
                        path: 'data-processor',
                        data: {
                            menu: {
                                title: 'Data Processor'
                            }
                        }
                    }
                ]
            },
            {
                path: 'comparison',
                data: {
                    menu: {
                        title: 'Comparison',
                        id: 'comparison',
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
                                title: 'Comparison Solution'
                            }
                        }
                    },
                    {
                        path: 'cmp-example',
                        data: {
                            menu: {
                                title: 'Comparison Example'
                            }
                        }
                    },
                    {
                        path: 'start-cmp',
                        data: {
                            menu: {
                                title: 'Start Comparison'
                            }
                        }
                    }
                ]
            },
            {
                path: 'help',
                data: {
                    menu: {
                        title: 'Help',
                        id: 'help',
                        icon: 'appstore-o',
                        selected: true,
                        expanded: false,
                        order: 0
                    }
                }
            }
        ]
    }
];
