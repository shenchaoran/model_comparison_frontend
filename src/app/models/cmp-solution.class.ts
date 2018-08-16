/**
 * 比较方案只是比较对象的集合
 */
import { ResourceSrc } from '@models/resource.enum';
import { DataRefer } from '@models/dataRefer.class';
import { CmpObj } from './cmp-obj.class';
import { LoginService } from '@common/feature/login/login.service';

export class CmpSolution {
    _id?: any;
    meta: {
        name: string,
        desc: string,
        time: number
    };
    auth: {
        userId: string,
        userName: string,
        src: ResourceSrc
    };
    issueId: string;
    participants: any[];
    cmpObjs: CmpObj[];
    [key: string]: any;

    constructor() {
        this.meta = {
            name: '',
            desc: '',
            time: undefined
        };
        this.cmpObjs = [];
        const user = LoginService.getUser();
        if(user) {
            this.auth = {
                userId: user._id,
                userName: user.username,
                src: ResourceSrc.PUBLIC
            };
        }
        else {
            this.auth = {
                userId: undefined,
                userName: undefined,
                src: undefined
            };
        }
    }
}