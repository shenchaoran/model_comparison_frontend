import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { Login } from './login.component';
import { routing } from './login.routing';
import { LoginService } from './login.service';
import { NgxSharedModule } from '@ngx-shared';
import { TokenInterceptor } from '@core/net/token/token.interceptor';
import { ResParserInterceptor } from '@core/net/res-parser/res-parser.interceptor';
import {
    PerfectScrollbarModule,
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        routing,
        NgxSharedModule,
        PerfectScrollbarModule,
    ],
    declarations: [
        Login
    ],
    providers: [
        LoginService,
        { provide: HTTP_INTERCEPTORS, useClass: ResParserInterceptor, multi: true},
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class LoginModule { }