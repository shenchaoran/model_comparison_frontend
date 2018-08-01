import {
    NgModule,
    ModuleWithProviders,
    Optional,
    SkipSelf
} from '@angular/core';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { TranslatorService } from './translator/translator.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './net/token/token.interceptor';
import { ResParserInterceptor } from './net/res-parser/res-parser.interceptor';
import { DynamicTitleService } from './services';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';
// import { TokenService } from './net/token/token.service';
import { BACKEND } from '@config';

import {
    // AuthGuard,
    BaThemeSpinner,
    EchartAdapterService,
    TableAdapterService
} from './services';

const CITYFUN_SERVICES = [
    // AuthGuard,

    BaThemeSpinner,
    EchartAdapterService,
    TableAdapterService,
    NzNotificationService
];

@NgModule({
    declarations: [],
    imports: [
        
    ],
    providers: [
        TranslatorService,
        ...CITYFUN_SERVICES,
        {
            provide: 'BACKEND',
            useValue: {
                host: BACKEND.host,
                port: BACKEND.port,
                API_prefix: BACKEND.API_prefix
            }
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResParserInterceptor,
            multi: true
        },
        // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        DynamicTitleService,
    ]
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule
    ) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }

    // static forRoot(): ModuleWithProviders {
    // 	return <ModuleWithProviders>{
    // 		ngModule: CoreModule,
    // 		providers: [
    // 			// BaThemeConfigProvider,
    // 			// BaThemeConfig,
    // 			...CITYFUN_VALIDATORS,
    // 			...CITYFUN_SERVICES,
    // 		],
    // 	};
    // }
}
