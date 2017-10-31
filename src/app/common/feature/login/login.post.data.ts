import { Md5 } from 'ts-md5/dist/md5';

export class LoginData{
    private appid: string;
    private account: string;
    private password: string;
    private logintype: string;

    constructor(appid: string, account: string, password: string, logintype?: string){
        this.appid = appid;
        this.account = account;
        this.password = Md5.hashStr(password).toString();
        this.logintype = logintype;
    }
}

export class LoginPostData{
    // private token: string;
    // private username: string;

    private data: LoginData;

    constructor(appid: string, account: string, password: string, logintype?: string){
        // this.token = token;
        // this.username = username;

        this.data = new LoginData(appid, account, password, logintype);
    }
}