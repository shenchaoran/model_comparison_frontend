import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@common/core/services/http.client';
import { ListBaseService } from '@common/shared';

@Injectable()
export class CmpMethodService extends ListBaseService {
    protected baseUrl = 'comparison/methods';

    constructor(
        protected http: _HttpClient
    ) {
        super(http);
    }
}
