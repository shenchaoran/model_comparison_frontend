import {
    NgModule,
    ModuleWithProviders,
    Optional,
    SkipSelf
} from '@angular/core';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { TranslatorService } from './translator/translator.service';
// import { TokenService } from './net/token/token.service';

import {
    RootService,
    AppMetaInfoService,
    ServiceMetaInfoService,
    ModulesConfigService,
    DataInquireService,
    AuthGuard,
    BaThemePreloader,
    BaThemeSpinner
    // EchartAdapterService
} from './services';

const CITYFUN_SERVICES = [
    RootService,
    AppMetaInfoService,
    ServiceMetaInfoService,
    ModulesConfigService,
    DataInquireService,
    AuthGuard,

    BaThemePreloader,
    BaThemeSpinner
    // EchartAdapterService
];

@NgModule({
    declarations: [],
    imports: [],
    providers: [
        TranslatorService,
        ...CITYFUN_SERVICES,
        // TokenService
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
