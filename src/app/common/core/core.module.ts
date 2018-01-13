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
// import { TokenService } from './net/token/token.service';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/do';
import { BACKEND } from '@config';

import {
    AuthGuard,
    BaThemeSpinner,
    EchartAdapterService,
    TableAdapterService
} from './services';

const CITYFUN_SERVICES = [
    AuthGuard,

    BaThemeSpinner,
    EchartAdapterService,
    TableAdapterService
];

@NgModule({
    declarations: [],
    imports: [],
    providers: [
        TranslatorService,
        ...CITYFUN_SERVICES,
        {
            provide: 'BACKEND',
            useValue: {
                host: BACKEND.host,
                port: BACKEND.port
            }
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResParserInterceptor,
            multi: true
        },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
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
