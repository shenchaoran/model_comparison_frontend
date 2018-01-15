export class Task {
    constructor (
        modelName: string,
        dataName: string,
        solutionName: string,
        desc: string,
        dateFinish: string,
        username: string
    ){
        this.modelName = modelName;
        this.dataName = dataName;
        this.solutionName = solutionName;
        this.dateFinish = dateFinish;
        this.desc = desc;
        this.username = username;
    }
    modelName: string;
    dataName: string;
    solutionName: string;
    desc: string;
    dateFinish: string;
    username: string
}