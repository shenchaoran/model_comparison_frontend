// header menu 的图标库使用的是 zorro 的
// sider menu 的图标库使用的是 ngx-admin 的
export class MenuClass {
    isDivider?: boolean;
    path?: string;
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
    disabled?: boolean;
}


export const HEADER_MENUS: MenuClass[] = [
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
                path: 'geo-models',
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
                        icon: 'database',
                        selected: true,
                        expanded: false,
                        order: 0
                    }
                }
                // children: [
                //     {
                //         path: 'std-data-set',
                //         data: {
                //             menu: {
                //                 title: 'Standard Data Set'
                //             }
                //         }
                //     },
                //     {
                //         path: 'data-processor',
                //         data: {
                //             menu: {
                //                 title: 'Data Processor'
                //             }
                //         }
                //     }
                // ]
            },
            {
                path: 'comparison',
                data: {
                    menu: {
                        title: 'Comparison',
                        id: 'comparison',
                        icon: 'smile-o',
                        selected: true,
                        expanded: false,
                        order: 0
                    }
                },
                children: [
                    {
                        path: 'solutions',
                        data: {
                            menu: {
                                title: 'Comparison Solution'
                            }
                        }
                    },
                    {
                        path: 'tasks',
                        data: {
                            menu: {
                                title: 'Comparison Task'
                            }
                        }
                    },
                    {
                        path: 'scenes',
                        data: {
                            menu: {
                                title: 'Comparison Scene'
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
                        icon: 'question',
                        selected: true,
                        expanded: false,
                        order: 0
                    }
                }
            }
        ]
    }
];

// 登录成功后的用户菜单
export const USER_MENUS: MenuClass[] = [
    {
        path: 'webNJGIS',
        children: [
            {
                path: 'user',
                data: {
                    menu: {
                        title: 'User',
                        id: 'user',
                        icon: 'user',
                        selected: true,
                        expanded: false,
                        order: 0
                    }
                },
                children: [
                    {
                        path: 'x',
                        data: {
                            menu: {
                                title: 'xxx'
                            }
                        },
                        disabled: true
                    },
                    {
                        path: 'profile',
                        data: {
                            menu: {
                                title: 'Profile'
                            }
                        }
                    },
                    {
                        path: 'stars',
                        data: {
                            menu: {
                                title: 'Stars'
                            }
                        }
                    },
                    {
                        path: 'resources',
                        data: {
                            menu: {
                                title: 'Resources'
                            }
                        }
                    },
                    {
                        isDivider: true
                    },
                    {
                        path: 'set-up',
                        data: {
                            menu: {
                                title: 'Setting'
                            }
                        }
                    },
                    {
                        path: 'sign-out',
                        data: {
                            menu: {
                                title: 'Sign Out'
                            }
                        }
                    }
                ]
            }
        ]
    }
]
