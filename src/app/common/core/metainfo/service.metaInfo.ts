export class ServiceMetaInfo {
    private _id: string;
    private _uri: string; //路径信息
    private _name: string;
    private _des: string;
    private _type: number;// 默认为 0 = 不存在， 1 = 本地相对路径 ，2 = 本地绝对路径 ，3 = 远程路径
    private _version: string;//接口版本号

    public get id() {
        return this._id;
    }

    public set id(val: string) {
        this._id = val;
    }

    public get uri() {
        return this._uri;
    }

    public set uri(val: string) {
        this._uri = val;
    }

    public get type() {
        return this._type;
    }

    public set type(val: number) {
        this._type = val;
    }

    public get name() {
        return this._name;
    }

    public set name(val: string) {
        this._name = val;
    }

    public get version() {
        return this._version;
    }

    public set version(val: string) {
        this._version = val;
    }

    public get des() {
        return this._des;
    }

    public set des(val: string) {
        this._des = val;
    }

}
