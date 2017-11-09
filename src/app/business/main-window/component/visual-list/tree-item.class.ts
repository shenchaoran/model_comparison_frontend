import { TreeItemType } from './tree-item-type.enum';

export class TreeItem {
    id: string;
    // parentId?: string;
    label: string;
    icon?: string;
    expanded?: boolean;
    selected?: boolean;
    iconsize?: number;
    items?: Array<TreeItem>;
    data?: {
        guid?: string;
    };
    // store TreeItemType
    value?: TreeItemType;

    constructor(id: string, label: string, data?: any, value?: TreeItemType) {
        this.id = id;
        this.label = label;
        this.data = data;
        this.value = value;
    }
}