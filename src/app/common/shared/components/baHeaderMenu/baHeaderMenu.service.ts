import { Injectable, Inject } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { HEADER_MENUS, USER_MENUS } from '@config/menu.config';

@Injectable()
export class HeaderMenuService {
    constructor(@Inject('HEADER_MENUS') private header_menus, @Inject('USER_MENUS') private user_menus) {}

    getMenus(type: string) {
        let routes: Routes = undefined;
        if(type === 'HEADER_MENUS') {
            routes = <Routes>_.cloneDeep(this.header_menus);
        }
        else if(type === 'USER_MENUS') {
            routes = <Routes>_.cloneDeep(this.user_menus);
        }
        if(routes === undefined) {
            return [];
        }
        if(routes.length){
            let menuItems = routes;
            let strcatRoute = (suffixPath, children) => {
                if(children && children.length){
                    _.map(children, child => {
                        child.path = suffixPath + '/' + child.path;
                        strcatRoute(child.path, child.children);
                    });
                }
            };
            _.chain(menuItems)
                .map((menuItem) => {
                    strcatRoute(menuItem.path, menuItem.children);
                })
                .value();
            return menuItems;
        }
        else{
            return [];
        }
    }
}
