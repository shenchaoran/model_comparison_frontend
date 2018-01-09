import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { _HttpClient } from '@core/services/http.client';
import * as uuidv1 from 'uuid/v1';

import * as ol from 'openlayers';
import * as echarts from 'echarts';

import { MapService } from './map.service';

import { OLSymbolService } from './ol-symbol.service';
import { OL_MAP_DRAW_TYPE } from '../models';
import { ColorConverter } from '@utils/colorCoverter.service';

@Injectable()
export class OlMapService extends MapService {
    constructor(protected http: _HttpClient){
        super(http);
    }


}
