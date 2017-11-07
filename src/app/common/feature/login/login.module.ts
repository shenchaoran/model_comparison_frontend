import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { Login } from './login.component';
import { routing } from './login.routing';
import { LoginService } from './login.service';
import { NgxSharedModule } from '../../ngx-shared/ngx-shared.module';
import { TokenInterceptor } from '../../core/net/token/token.interceptor';
import { ResParserInterceptor } from '../../core/net/res-parser/res-parser.interceptor';

// const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
// };

@NgModule({
    imports: [
        routing,
        // NgZorroAntdModule,

        NgxSharedModule,

        // PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
    ],
    declarations: [
        Login
    ],
    providers: [
        LoginService,
        { provide: HTTP_INTERCEPTORS, useClass: ResParserInterceptor, multi: true},
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    ]
})
export class LoginModule { }