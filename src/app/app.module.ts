import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';
import { GlobalState } from './global.state';

import { AppTranslationModule } from './app.translation.module';
import { NgxSharedModule } from './common/ngx-shared';
import { SharedModule } from './common/shared';
import { CoreModule } from './common/core/core.module';
import { routing } from './app.routing';
import { App } from './app.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';


@NgModule({
    bootstrap: [App],
    declarations: [App],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        BrowserAnimationsModule,
        // NgZorroAntdModule.forRoot(),
        RouterModule,
        routing,

        NgxSharedModule,
        AppTranslationModule,
        SharedModule.forRoot(),
        CoreModule,
    ],
    providers: [
        _HttpClient,
        GlobalState,

        {
            provide: NZ_NOTIFICATION_CONFIG,
            useValue: { nzDuration: 3000, nzTop: '60px' }
        },
        NzNotificationService,
    ]
})
export class AppModule {}
