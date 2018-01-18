export class Data {
    dataId: string;
    dataName: string;
    dataTags: Array<string>;
    dataDesc: string;
    supportModels: Array<string>;
    belongSolutions: Array<string>;
    belongTasks: Array<string>;

    constructor(
        dataId: string,
        dataName: string,
        dataTags: Array<string>,
        dataDesc: string,
        supportModels: Array<string>,
        belongSolutions: Array<string>,
        belongTasks: Array<string>    
    ) {
        this.dataId = dataId;
        this.dataName = dataName;
        this.dataTags = dataTags;
        this.dataDesc = dataDesc;
        this.supportModels = supportModels;
        this.belongSolutions = belongSolutions;
        this.belongTasks = belongTasks;
    }
}