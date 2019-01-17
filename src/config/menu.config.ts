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
    {
        path: '/map',
        label: 'Application'
    },
    // {
    //     path: '/test',
    //     label: 'Test'
    // }
];