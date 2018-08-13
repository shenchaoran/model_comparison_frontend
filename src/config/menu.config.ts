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
        path: 'datasets',
        data: {
            menu: {
                title: 'Datasets',
                id: 'datasets',
                icon: ''
            }
        }
    },
    {
        path: 'models',
        data: {
            menu: {
                title: 'Models',
                id: 'models',
                icon: ''
            }
        }
    },
    {
        path: 'comparison',
        data: {
            menu: {
                title: 'Comparison'
            }
        },
        children: [
            {
                path: 'cmp-methods',
                data: {
                    menu: {
                        title: 'Comparison methods'
                    }
                }
            },
            {
                path: 'cmp-solutions',
                data: {
                    menu: {
                        title: 'Comparison solutions'
                    }
                }
            }
        ]
    },
    {
        path: 'results',
        data: {
            menu: {
                title: 'Results & Diagnostics',
                id: 'results',
                icon: ''
            }
        },
        children: [
            {
                path: 'calculation',
                data: {
                    menu: {
                        title: 'Calculation Result'
                    }
                }
            },
            {
                path: 'comparison',
                data: {
                    menu: {
                        title: 'Comparison Result'
                    }
                }
            }
        ]
    },
    {
        path: 'test',
        data: {
            menu: {
                title: 'Test'
            }
        }
    }
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
