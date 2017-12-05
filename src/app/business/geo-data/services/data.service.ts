import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataInquireService } from '@core/services/data.inquire.service';

@Injectable()
export class DataService {
    constructor(
        private http: HttpClient,
        private dataInquire: DataInquireService
    ) {}

    getModelTree(): Observable<any> {
        return this.dataInquire.get('getModelTree');
    }
}
