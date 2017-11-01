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
// import { TokenService } from './net/token/token.service';

import {
    DataInquireService,
    AuthGuard,
    BaThemeSpinner
    // EchartAdapterService
} from './services';

const CITYFUN_SERVICES = [
    DataInquireService,
    AuthGuard,

    BaThemeSpinner
    // EchartAdapterService
];

@NgModule({
    declarations: [],
    imports: [],
    providers: [
        TranslatorService,
        ...CITYFUN_SERVICES,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
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
