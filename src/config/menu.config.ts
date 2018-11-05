// header menu 的图标库使用的是 zorro 的
// sider menu 的图标库使用的是 ngx-admin 的
export class MenuClass {
    path?: string;
    label: string;
    children?: Array<MenuClass>;
    disabled?: boolean;
    icon?: string;
}

export const HEADER_MENUS: MenuClass[] = [
    {
        path: '/home',
        label: 'Home',
    },
    {
        path: '/datasets',
        label: 'Datasets',
    },
    {
        path: '/models',
        label: 'Models',
    },
    {
        path: '/comparison/solutions',
        label: 'Comparison'
    },
    {
        path: '/results',
        label: 'Results & Diagnostics',
        children: [
            {
                path: '/results/calculation',
                label: 'Calculation Result',
            },
            {
                path: '/results/comparison',
                label: 'Comparison Result'
            }
        ]
    },
];

// 登录成功后的用户菜单
export const USER_MENUS: MenuClass = {
    path: '/user',
    label: 'User',
    children: [
        {
            path: '/user/profile',
            label: 'Profile'
        },
        {
            path: '/user/set-up',
            label: 'Setting'
        },
        {
            path: '/user/sign-out',
            label: 'Sign Out'
        }
    ]
};