import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { _HttpClient } from '@core/services/http.client';
import { UDXSchema } from '../@models/UDX-schema.class';

@Injectable({
    providedIn: 'root'
})
export class SchemaService {
    schemas: UDXSchema[] = [];

    constructor(
        private http: _HttpClient,
        @Inject('API') public api,
    ) {}
    
    getById(schemaId): UDXSchema {
        return _.find(this.schemas, {id: schemaId}) as any
    }
    
    loadSchemas() {
        return new Promise((resolve, reject) => {
            let url = `${this.api.backend}/schemas`
            this.http.get(url).toPromise()
                .then(res => {
                    this.schemas = res.data;
                    resolve()
                })
                .catch(e => {
                    console.error(e)
                    resolve()
                })
        })
    }
}