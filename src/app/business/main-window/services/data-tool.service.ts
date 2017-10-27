import { Resolve, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DataInquireService } from '../../../common/core/services/data.inquire.service';

@Injectable()
export class DataToolService implements Resolve<any> {
    resolve() {
        return Promise.resolve();
    }

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private dataInquireService: DataInquireService
    ) {}

}
