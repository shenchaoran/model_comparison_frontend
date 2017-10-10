// 

export class HeaderMenuMetaInfo {
    path: string;
    data?: {
        menu: {
            title: string;
            id?: string;
            icon?: string;
            selected?: boolean;
            expanded?: boolean;
            order?: number
        }
    };
    children?: Array<HeaderMenuMetaInfo>;

    constructor(){}
}