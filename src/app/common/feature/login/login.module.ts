import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { Login } from '@common/feature/login/login.component';
import { routing } from '@common/feature/login/login.routing';
import { LoginService } from '@common/feature/login/login.service';
import { NgxSharedModule } from '@common/ngx-shared';
import { TokenInterceptor } from '@common/core/net/token/token.interceptor';
import { ResParserInterceptor } from '@common/core/net/res-parser/res-parser.interceptor';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';

@NgModule({
    imports: [
        routing,
        NgxSharedModule,
    ],
    declarations: [
        Login
    ],
    providers: [
        LoginService,
        { provide: HTTP_INTERCEPTORS, useClass: ResParserInterceptor, multi: true},
        // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        NzNotificationService
    ]
})
export class LoginModule { }