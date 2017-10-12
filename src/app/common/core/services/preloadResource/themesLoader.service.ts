import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ThemesLoaderService implements Resolve<any>{

constructor() { }

resolve(){
  return this.getThemeCodes()
    .toPromise()
    .then(data => data)
    .catch(this.handleError);
}

private getThemeCodes(): Observable<any> {
  return Observable.create(observer => {
    let themes = sessionStorage.getItem("THEMES");
    if (themes) {
      themes = JSON.parse(themes);
      observer.next(themes);
      observer.complete();
    }
    else {
      postal
        .channel("PRELOADSESSIONSTORAGE_INQUIRE_CHANNEL")
        .subscribe("getThemeCodes", (data, envelope) => {
          data = data.result[0];
          data = this.convertor(data);
          sessionStorage.setItem('THEMES', JSON.stringify(data));

          observer.next(data);
          observer.complete();
        });

      postal.channel("DATA_INQUIRE_CHANNEL").publish('data.inquire.get', {
        serviceId: "getThemeCodes",
        query: {
          apikey: 111
        },
        callback: "PRELOADSESSIONSTORAGE_INQUIRE_CHANNEL#getThemeCodes"
      });
    }
  });
}

private convertor(theme){
  let themes = [];
  for (let key in theme) {
    themes.push({
      code: key,
      value: theme[key]
    });
  }
  return themes;
}

private handleError(error: any) {
  let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(errMsg); // log to console instead
  return Observable.throw(errMsg);
}

}
