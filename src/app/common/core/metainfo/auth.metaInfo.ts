export class AuthInfo {
    private _islogin: boolean;
    private _ticket: string;
    private _loginTime: string;
    private _loginIp: string;
    private _nickname: string;

    public get islogin() {
        return this._islogin;
    }
	public set islogin(val: boolean) {
        this._islogin = val;
    }

    public get ticket() {
        return this._ticket;
    }
	public set ticket(val: string) {
        this._ticket = val;
    }

    public get loginTime() {
        return this._loginTime;
    }
	public set loginTime(val: string) {
        this._loginTime = val;
    }

    public get loginIp() {
        return this._loginIp;
    }
	public set loginIp(val: string) {
        this._loginIp = val;
    }

    public get nickname() {
        return this._nickname;
    }
	public set nickname(val: string) {
        this._nickname = val;
    }

    constructor(islogin, ticket, loginTime, loginIp, nickname){
        this.islogin = islogin;
        this.ticket = ticket;
        this.loginTime = loginTime;
        this.loginIp = loginIp;
        this.nickname = nickname;
    }

    public parse2Json(){
        let object: any = {};
        object.islogin = this.islogin;
        object.ticket = this.ticket;
        object.loginTime = this.loginTime;
        object.loginIp = this.loginIp;
        object.nickname = this.nickname;

        return JSON.stringify(object);
    }
}