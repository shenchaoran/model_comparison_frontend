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
        path: '/solutions',
        label: 'Solutions'
    },
    {
        path: '/results',
        label: 'Results & Diagnostics'
    }, 
    // {
    //     path: '/test',
    //     label: 'Test'
    // }
];

// 登录成功后的用户菜单
export const USER_MENUS: MenuClass = {
    path: '/user',
    label: 'User',
    children: [
        {
            path: '/user/:userName',
            label: 'Profile'
        },
        {
            path: '/user/:userName/set-up',
            label: 'Setting'
        },
        { 
            path: '/user/sign-out',
            label: 'Sign Out'
        }
    ]
};