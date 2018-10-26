import { Observable } from "rxjs";

export interface OgmsService {
    import?(...args: any[]): void;
    create(...args: any[]): any;
    clear(...args: any[]): void;
    insert(...args: any[]): Observable<any>;
    upsert(...args: any[]): Observable<any>;
    findOne(...args: any[]): Observable<any>;
    findAll(...args: any[]): Observable<any>;
    findByPage?(...args: any[]): Observable<any>;
    delete(...args: any[]): Observable<any>;
    patch?(...args: any[]): Observable<any>;
}