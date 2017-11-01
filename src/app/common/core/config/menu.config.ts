export class MenuClass {
    path: string;
    data: {
        menu: {
            title: string;
            id?: string;
            icon?: string;
            selected?: boolean;
            expanded?: boolean;
        };
    };
    children?: Array<MenuClass>;
}

export const MENUS = [
    {
        path: 'webNJGIS',
        children: [
            {
                path: 'home',
                data: {
                    menu: {
                        title: 'Geomodelling',
                        id: 'home',
                        icon: 'appstore',
                        selected: true,
                        expanded: false,
                        order: 0
                    }
                },
                children: [
                    {
                        path: 'a',
                        data: {
                            menu: {
                                title: 'a'
                            }
                        }
                    }
                ]
            },
            {
                path: ':username',
                data: {
                    menu: {
                        title: 'profile',
                        id: ':username',
                        icon: 'appstore',
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
                        },
                        children: [
                            {
                                path: 'a',
                                data: {
                                    menu: {
                                        title: 'main-window'
                                    }
                                }
                            },
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
                        path: 'main-window',
                        data: {
                            menu: {
                                title: 'main-window'
                            }
                        }
                    }
                ]
            }
        ]
    }
];
