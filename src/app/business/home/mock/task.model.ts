export class Task {
    taskId: string;
    modelName: string;
    dataName: string;
    solutionName: string;
    desc: string;
    dateFinish: string;
    username: string

    constructor (
        taskId: string,
        modelName: string,
        dataName: string,
        solutionName: string,
        desc: string,
        dateFinish: string,
        username: string
    ){
        this.taskId = taskId;
        this.modelName = modelName;
        this.dataName = dataName;
        this.solutionName = solutionName;
        this.dateFinish = dateFinish;
        this.desc = desc;
        this.username = username;
    }
}