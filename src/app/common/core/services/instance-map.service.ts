/**
 * 实例对象字典
 */

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import * as uuidv1 from 'uuid/v1';
import { _HttpClient } from '@common/core/services/http.client';
import * as echarts from 'echarts';
import { ErrorHandle } from '@common/core/base/error-handle';

export class InstanceMapService extends ErrorHandle {
    // maps map
  protected _maps: { [id: string]: any } = {};
  protected _selectedMapId;

  // 画的 point, polyline, polygon
  draw: any;

  constructor(protected http: _HttpClient) {
    super();
  }

  // region maps db
  get maps() {
    return this._maps;
  }

  get selectedMapId() {
    return this._selectedMapId;
  }

  get selectedMap(): any {
    // return _.find(this.maps, map => map.id === this.selectedMapId);
    return this.maps[this.selectedMapId];
  }

  upsertMap(id: string, map: any) {
    _.set(this.maps, id, map);
  }

  deleteMap(id: string): any {
    // return _.remove(this.maps, map => map.id === id);
    return _.unset(this.maps, id);
  }

  findMap(id: string): any {
    // return _.find(this.maps, map => map.id === id);
    return this.maps[id];
  }

  setSelectedMap(id: string): boolean {
      if(this.maps[id] !== undefined) {
          this._selectedMapId = id;
          return true;
      }
      else {
          this._selectedMapId = undefined;
          return false;
      }
  }

  addAndSelectMap(id: string, map: any) {
    this.upsertMap(id, map);
    this.setSelectedMap(id);
  }
}