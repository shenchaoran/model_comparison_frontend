export class Model {
    modelId: string;
    modelName: string;
    modelTags: Array<string>;
    modelDesc: string;
    author: string;
    supportDatas: Array<string>;
    belongSolutions: Array<string>;
    belongTasks: Array<string>;

    constructor(
        modelId: string,
        modelName: string,
        modelTags: Array<string>,
        modelDesc: string,
        author: string,
        supportDatas: Array<string>,
        belongSolutions: Array<string>,
        belongTasks: Array<string>
    ) {
        this.modelId = modelId;
        this.modelName = modelName;
        this.modelTags = modelTags;
        this.modelDesc = modelDesc;
        this.author = author;
        this.supportDatas = supportDatas;
        this.belongSolutions = belongSolutions;
        this.belongTasks = belongTasks;        
    }
}