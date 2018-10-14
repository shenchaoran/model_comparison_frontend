import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { _HttpClient } from '@common/core/services/http.client';
import { GlobalState } from './global.state';

import { AppTranslationModule } from './app.translation.module';
import { SharedModule } from '@common/shared';
import { CoreModule } from '@core';
import { AppRoutingModule } from './app.routing';
import { App } from './app.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';
import { DisqusModule } from "ngx-disqus";
import { UserService  } from '@services';

@NgModule({
    bootstrap: [App],
    declarations: [App],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NgZorroAntdModule,
        RouterModule,
        AppRoutingModule,

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
        UserService,
    ]
})
export class AppModule {}
