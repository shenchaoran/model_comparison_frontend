import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Injectable()
export class DynamicTitleService {
    constructor(
        private title: Title,
        private route: ActivatedRoute,
        private router: Router
    ) { 
        this.setTitleByRoute();
    }

    private setTitleByRoute() {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.route)
            .map((route) => {
                let i = 1;
                while(route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            })
            .mergeMap(route => route.data)
            .subscribe(event => {
                if(event['title']) {
                    this.title.setTitle(event['title']);
                }
                else {
                    this.title.setTitle('Model Comparison')
                }
            });
    }

    public setTitle(v) {
        this.title.setTitle(v);
    }

    public getTitle() {
        return this.title.getTitle();
    }
}