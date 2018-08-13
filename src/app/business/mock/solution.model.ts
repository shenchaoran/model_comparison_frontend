export class Solution {
    id: string;
    name: string;
    tags: Array<string>;
    author: string;
    region: string;
    desc: string;
    inputfeatures: Array<string>;
    outputfeatures: Array<string>;
    timerange: Array<string>;
    supportModels: Array<string>;
    supportDatas: Array<string>;
    belongTasks: Array<string>;

    constructor(
        id: string,
        name: string,
        tags: Array<string>,
        author: string,
        region: string,
        desc: string,
        inputfeatures: Array<string>,
        outputfeatures: Array<string>,
        timerange: Array<string>,
        supportModels: Array<string>,
        supportDatas: Array<string>,
        belongTasks: Array<string>,
    ) {
        this.id = id,
        this.name = name,
        this.tags = tags,
        this.author = author,
        this.region = region,
        this.desc = desc,
        this.inputfeatures = inputfeatures,
        this.outputfeatures = outputfeatures,
        this.timerange = timerange,
        this.supportModels = supportModels,
        this.supportDatas = supportDatas,
        this.belongTasks = belongTasks
    }
}