export class AppMetaInfo {
    private _appId: string;
    private _appName: string;
    private _appDes: string;
    private _defaultRoute: string;

    public get appid() {
        return this._appId;
    }

    public set appid(val: string) {
        this._appId = val;
    }

    public get name() {
        return this._appName;
    }

    public set name(val: string) {
        this._appName = val;
    }

    public get des() {
        return this._appDes;
    }

    public set des(val: string) {
        this._appDes = val;
    }

    public get defaultroute() {
        return this._defaultRoute;
    }

    public set defaultRoute(val: string) {
        this._defaultRoute = val;
    }
}