import { Injectable } from '@angular/core';

@Injectable()
export class TableAdapterService {

  constructor() { }

  public getTHead(tts){
    return _.map(tts, 'did');
  }

  public getTBody(tdc){
    let rows = [];
    _.map(tdc, tr => {
      let row = {};
      _.map(tr, td => {
        row[td.did] = td.dv;
      });
      rows.push(row);
    });
    return rows;
  }
}
