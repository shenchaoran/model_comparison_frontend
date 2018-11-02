import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
    selector: 'ogms-app',
    template: `
        <router-outlet></router-outlet>
        <ng2-slim-loading-bar color='#e0631a' height='4px'></ng2-slim-loading-bar>
    `
})
export class AppComponent { }

/********************************************************************** */
const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './business/home/index#HomeModule'
    },
    {
        path: 'user',
        loadChildren: './business/user/index#UserModule'
    },
    {
        path: 'datasets',
        loadChildren: './business/datasets/index#DatasetsModule'
    },
    {
        path: 'models',
        loadChildren: './business/ms/index#ModelsModule'
    },
    {
        path: 'comparison',
        loadChildren: './business/comparison/index#ComparisonModule'
    },
    {
        path: 'results',
        loadChildren: './business/results/index#ResultsModule'
    },
    {
        path: 'search',
        loadChildren: './business/search/index#SearchModule'
    },
    {
        path: 'test',
        loadChildren: './business/test/index#TestModule'
    },
    {
        path: 'topics',
        loadChildren: './business/topic/index#TopicModule'
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule { }

/********************************************************************** */
@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        AppRoutingModule,
        SlimLoadingBarModule,
        CoreModule.forRoot(),
        NgZorroAntdModule.forRoot(),
        OverlayModule,
    ],
    providers: []
})
export class AppModule { }