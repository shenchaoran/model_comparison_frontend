export class MapModuleCfg{
    id: string;
    name: string;
    load: boolean;
    desc?: string;
    children?: MapModuleCfg[];
    position?: string;
}