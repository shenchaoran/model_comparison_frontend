
import { Observable } from 'rxjs/Observable';

export class ErrorHandle {
    constructor() {}

    handleError(error: any) {
        let errMsg = error.message
            ? error.message
            : error.status
              ? `${error.status} - ${error.statusText}`
              : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}