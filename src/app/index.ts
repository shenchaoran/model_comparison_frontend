import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CoreModule } from '@core';
import { NgxSharedModule } from '@shared';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppRoutingModule } from './index-routing.module';

@Component({
    selector: 'ogms-app',
    template: `
        <router-outlet></router-outlet>
        <ng2-slim-loading-bar color='#e0631a' height='4px'></ng2-slim-loading-bar>
    `
})
export class AppComponent { }

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        OverlayModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SlimLoadingBarModule,
        CoreModule.forRoot(),
        NgxSharedModule,
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppModule { }