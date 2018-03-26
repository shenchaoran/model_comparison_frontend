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
        path: 'resources',
        data: {
            menu: {
                title: 'Resources',
                id: 'resources',
                icon: ''
            }
        },
        children: [
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
            },
        ]
    },
    {
        path: 'calculation',
        data: {
            menu: {
                title: 'Calculation'
            }
        }
    },
    // {
    //     path: 'issues',
    //     data: {
    //         menu: {
    //             title: 'Issues'
    //         }
    //     }
    // },
    // {
    //     path: 'solutions',
    //     data: {
    //         menu: {
    //             title: 'Solutions'
    //         }
    //     }
    // },
    {
        path: 'tasks',
        data: {
            menu: {
                title: 'Comparison'
            }
        }
    },
    {
        path: 'test',
        data: {
            menu: {
                title: 'Test'
            }
        }
    }
    // {
    //     path: 'comparison',
    //     data: {
    //         menu: {
    //             title: 'Comparison',
    //             id: 'comparison',
    //             icon: 'smile-o',
    //             selected: true,
    //             expanded: false,
    //             order: 0
    //         }
    //     },
    //     children: [
    //         {
    //             path: 'solutions',
    //             data: {
    //                 menu: {
    //                     title: 'Comparison Solution'
    //                 }
    //             }
    //         },
    //         {
    //             path: 'tasks',
    //             data: {
    //                 menu: {
    //                     title: 'Comparison Task'
    //                 }
    //             }
    //         },
    //         {
    //             path: 'scenes',
    //             data: {
    //                 menu: {
    //                     title: 'Comparison Scene'
    //                 }
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: 'help',
    //     data: {
    //         menu: {
    //             title: 'Help',
    //             id: 'help',
    //             icon: 'question',
    //             selected: true,
    //             expanded: false,
    //             order: 0
    //         }
    //     }
    // }
];

// 登录成功后的用户菜单
export const USER_MENUS: MenuClass[] = [
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
                path: 'profile',
                data: {
                    menu: {
                        title: 'Profile'
                    }
                }
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
];
