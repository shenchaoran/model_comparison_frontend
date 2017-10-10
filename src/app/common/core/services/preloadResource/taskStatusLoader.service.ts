import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TaskStatusLoaderService implements Resolve<any>{

constructor() { }

resolve(){
  return this.getTaskStatusCodes()
    .toPromise()
    .then( data => data)
    .catch(this.handleError);
}

private convertor(status){
  let taskStatus = [];
  for (let key in status) {
    taskStatus.push({
      code: key,
      value: status[key]
    });
  }
  return taskStatus;
}

private getTaskStatusCodes(): Observable<any> {
  return Observable.create(observer => {
    let taskStatus = sessionStorage.getItem("TASKSTATUS");
    if (taskStatus) {
      taskStatus = JSON.parse(taskStatus);
      observer.next(taskStatus);
      observer.complete();
    }
    else {
      postal
        .channel("PRELOADSESSIONSTORAGE_INQUIRE_CHANNEL")
        .subscribe("getTaskStatusCodes", (data, envelope) => {
          data = data.result[0];
          data = this.convertor(data);
          sessionStorage.setItem('TASKSTATUS', JSON.stringify(data));

          observer.next(data);
          observer.complete();
        });

      postal.channel("DATA_INQUIRE_CHANNEL").publish("data.inquire", {
        serviceId: "getTaskStatusCodes",
        params: {
          apikey: 111
        },
        callback: "PRELOADSESSIONSTORAGE_INQUIRE_CHANNEL#getTaskStatusCodes"
      });
    }
  });
}

private handleError(error: any) {
  let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(errMsg); // log to console instead
  return Observable.throw(errMsg);
}

}
