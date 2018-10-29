import { Observable } from "rxjs";

export interface OgmsService {
    import?(...args: any[]): void;                  // 从别的服务哪里初始化
    create?(...args: any[]): any;                    // 新建条目
    clear(...args: any[]): void;                    // 清空单例服务的内存
    insert(...args: any[]): Observable<any>;
    upsert(...args: any[]): Observable<any>;
    findOne(...args: any[]): Observable<any>;
    findAll(...args: any[]): Observable<any>;
    findByPage?(...args: any[]): Observable<any>;
    delete(...args: any[]): Observable<any>;
    patch?(...args: any[]): Observable<any>;
}