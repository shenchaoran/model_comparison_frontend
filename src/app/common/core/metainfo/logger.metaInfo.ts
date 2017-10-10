export class LoggerMetaInfo {
    // private _guid: string;
    // private _appId: string;
    private _ticket: string;
    private _moduleId: string;
    private _componentId: string;
    private _buttonId: string;
    private _content: any;
    // private _dateTime: Date;

    constructor(appId, moduleId, componentId, buttonId, content?){
        // this._guid = guid;
        // this._appId = appId;
        this._ticket = JSON.parse(sessionStorage.getItem('authInfo')).ticket;
        this._moduleId = moduleId;
        this._componentId = componentId;
        this._buttonId = buttonId;
        this._content = content;
        // this._dateTime = new Date();
    }
}