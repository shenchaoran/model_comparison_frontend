import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';
import { ListBaseService } from '@shared';

@Injectable()
export class CalcuTaskService extends ListBaseService {
    protected baseUrl = 'calculation';

    constructor(
        protected http: _HttpClient
    ) {
        super(http);
    }
}