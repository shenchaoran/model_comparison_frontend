import {Route,PreloadingStrategy } from '@angular/router';  
import { Observable, of } from 'rxjs';  
 

/** 
 * 自定义的路由加载策略，在路由中定义 data.preload 为真的时候这个模块才需要被预先加载
 * 参考app-routing.module
 */  
export class CustomPreloadingStrategy implements PreloadingStrategy{  
    preload(route: Route, fn: () => Observable<any>): Observable<any>{  
        return route.data&&route.data.preload? fn(): of(null);  
    }  
}  