import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';
import * as proj4x from 'proj4';
const proj4 = (proj4x as any).default;

@Injectable()
export class CmpTaskService implements Resolve<any> {
  constructor(
    private http: _HttpClient
  ) {}

  resolve() {
    return this.getDataTabTree()
      .toPromise()
      .then(response => {
        if (response.error) {
          return Promise.reject(response.error);
        } else {
          const tabs = [];
          const tasks = response.data;
          if (tasks.personal) {
            tabs.push({
              name: 'Your Comparison Tasks',
              id: 'personal',
              data: tasks.personal
            });
          }
          if (tasks.public) {
            tabs.push({
              name: 'Public Comparison Tasks',
              id: 'public',
              data: tasks.public
            });
          }
          return Promise.resolve(tabs);
        }
      });
  }

  getDataTabTree(): Observable<any> {
    return this.http.get('/comparison/tasks');
  }

  /**
   * deprecated
   */
  extractHeader(geojson: any): any {
    if (
      geojson.features.length &&
      geojson.features[0].geometry.type === 'Polygon'
    ) {
      // 顺序不固定，得根据大小判断
      // 经度从西到东增加，非洲好望角附近为0, (-infi, +infi)(地图是连续的，所以可以小于0大于360)
      // 维度从南向北增加，[-90, 90]
      const leftBottom = geojson.features[0].geometry.coordinates[0][1];
      const rightTop = geojson.features[0].geometry.coordinates[0][3];
      const lb3857 = proj4('EPSG:3857', leftBottom);
      const rt3857 = proj4('EPSG:3857', rightTop);
      return {
        xllcorner: lb3857[0],
        yllcorner: lb3857[1],
        // cellsize: ,
        // ncols: ,
        // nrows: ,
        NODATA_value: -9999
      };
    } else {
      return undefined;
    }
  }

  insert(doc): Observable<any> {
    return this.http.post('/comparison/tasks', { doc: doc });
  }

  start(id: string): Observable<any> {
    if (id) {
      return this.http.post(`/comparison/tasks/${id}/start`, undefined);
    } else {
      return undefined;
    }
  }

  find(id: string): Observable<any> {
    if (id) {
      return this.http.get(`/comparison/tasks/${id}`);
    } else {
      return undefined;
    }
  }

  publishFind(id: string) {
    if (id) {
      this.http.get(`/comparison/tasks/${id}`).subscribe(response => {
        postal.channel('TASK_CHANNEL').publish('find', response);
      });
    } else {
      return undefined;
    }
  }

  changeParticipation(cmpTask) {
    _.map(cmpTask.cmpCfg.ms, ms => {
        _.map(cmpTask.cmpCfg.cmpObjs, cmpObj => {
            _.map(cmpObj.dataRefers, dataRefer => {
                if(dataRefer.msId === ms.msId) {
                    if(dataRefer.dataId == undefined 
                        && dataRefer.eventName != undefined 
                        && dataRefer.data.field != undefined
                    ) {
                        ms.participate = true;
                    }
                }
            });
        });
    });
  }
}
