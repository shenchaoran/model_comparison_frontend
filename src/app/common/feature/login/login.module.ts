import { NgModule } from '@angular/core';

import { Login } from './login.component';
import { routing } from './login.routing';
import { LoginService } from './login.service';

import { NgxSharedModule } from '../../ngx-shared/ngx-shared.module';

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
        LoginService
    ]
})
export class LoginModule { }