import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BlocksLoaderService implements Resolve<any>{

constructor() { }

resolve(){
  return this.getBlockCodes()
    .toPromise()
    .then( data => data)
    .catch(this.handleError);
}

private getBlockCodes(): Observable<any> {
  return Observable.create(observer => {
    let blocks = sessionStorage.getItem("BLOCKS");
    if (blocks) {
      blocks = JSON.parse(blocks);
      observer.next(blocks);
      observer.complete();
    }
    else {
      postal
        .channel("PRELOADSESSIONSTORAGE_INQUIRE_CHANNEL")
        .subscribe("getBlockCodes", (data, envelope) => {
          data = data.result[0];
          data = this.convertor(data);
          sessionStorage.setItem('BLOCKS', JSON.stringify(data));

          observer.next(data);
          observer.complete();
        });

      postal
        .channel("DATA_INQUIRE_CHANNEL")
        .publish("data.inquire", {
        serviceId: "getBlockCodes",
        params: {
          apikey: 111
        },
        callback: "PRELOADSESSIONSTORAGE_INQUIRE_CHANNEL#getBlockCodes"
      });
    }
  });
}

private convertor(block){
  let blocks = [];
  for (let key in block) {
    blocks.push({
      code: key,
      value: block[key]
    });
  }
  return blocks;
}

public getRst(){
  let blocks = sessionStorage.getItem("BLOCKS");
  if(blocks){
    return JSON.parse(blocks);
  }
  else{
    return null;
  }
}

private handleError(error: any) {
  let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(errMsg); // log to console instead
  return Observable.throw(errMsg);
}

}
