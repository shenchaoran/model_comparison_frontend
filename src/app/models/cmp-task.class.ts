import { ResourceSrc } from '@models/resource.enum';
import { LoginService } from '@common/feature/login/login.service';

export class CmpTask {
    _id?: any;
    meta: {
        name: string,
        desc: string,
        time: number
    };
    auth: {
        src: ResourceSrc,
        userId: string,
        userName: string
    };
    state: string;
    progress: number;
    solutionId?: string;
    issueId?: string;
    calcuTaskIds: {
        _id: string,
        progress: number
    }[];

    constructor() {
        this.meta = {
            name: null,
            desc: null,
            time: null
        };
        this.calcuTaskIds = [];
        
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
