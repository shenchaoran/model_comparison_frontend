import { Injectable, Inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { cloneDeep, map, chain } from 'lodash';

@Injectable()
export class HeaderMenuService {
    constructor(
        @Inject('HEADER_MENUS') private header_menus, 
        @Inject('USER_MENUS') private user_menus,
        @Inject('LOGIN_MENUS') private login_menus
    ) {}

    getMenus(type: string) {
        let routes: Routes = undefined;
        if(type === 'HEADER_MENUS') {
            routes = <Routes>cloneDeep(this.header_menus);
        }
        else if(type === 'USER_MENUS') {
            routes = <Routes>cloneDeep(this.user_menus);
        }
        else if(type === 'LOGIN_MENUS') {
            routes = <Routes>cloneDeep(this.login_menus);
        }
        
        if(routes === undefined) {
            return [];
        }
        if(routes.length){
            let menuItems = routes;
            let strcatRoute = (suffixPath, children) => {
                if(children && children.length){
                    let childPath = '';
                    map(children as any[], (child, i) => {
                        // if(suffixPath === '') {
                        //     child.path = child.path;
                        // }
                        // else {
                        //     child.path = suffixPath + '/' + child.path;
                        // }
                        child.path = suffixPath + '/' + child.path;

                        let tempPath = strcatRoute(child.path, child.children);
                        if(i === 0) {
                            childPath = tempPath;
                        }
                    });
                    return childPath;
                }
                else {
                    return suffixPath;
                }
            };
            chain(menuItems)
                .map((menuItem) => {
                    // menuItem.path = strcatRoute(menuItem.path, menuItem.children);
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
