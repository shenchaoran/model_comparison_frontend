import {
    NgModule,
    ModuleWithProviders,
    Optional,
    SkipSelf
} from '@angular/core';

import { throwIfAlreadyLoaded } from '@common/core/module-import-guard';
import { TranslatorService } from '@common/core/translator/translator.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '@common/core/net/token/token.interceptor';
import { ResParserInterceptor } from '@common/core/net/res-parser/res-parser.interceptor';
import { DynamicTitleService } from '@common/core/services';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';
import { _HttpClient } from '@common/core/services/http.client';
// import { TokenService } from './net/token/token.service';
import { BACKEND } from '@config';
import {
    UserService,
    SolutionService,
    TaskService,
    TopicService,
    CmpMethodService,
    ConversationService,
    DatasetService,
    ListBaseService,
    MSService,
    MSRService,
    SearchService,
 } from '@services';

import {
    AuthGuard,
    BaThemeSpinner,
    EchartAdapterService,
    TableAdapterService
} from '@common/core/services';

export * from './services';

const services = [
    AuthGuard,
    BaThemeSpinner,
    EchartAdapterService,
    TableAdapterService,
    NzNotificationService,
    TranslatorService,
    DynamicTitleService,
    _HttpClient,
    {
        provide: NZ_NOTIFICATION_CONFIG,
        useValue: { nzDuration: 3000, nzTop: '60px' }
    },
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
    {
        provide: 'SIMPLEMDE_CONFIG',
        useValue: {
            indentWithTabs: true,
            placeholder: 'some text',
            toolbar: [
                'bold',
                'italic',
                'heading',
                '|',
                'quote',
                'code',
                'unordered-list',
                'ordered-list',
                '|',
                'link',
                'image',
                '|',
                'preview',
                'side-by-side',
                'fullscreen',
                '|',
                'guide',
            ],
            toolbarTips: true,
            status: [
                'lines',
                'words',
                // 'cursor'
            ],
            styleSelectedText: true,
            spellChecker: false,
            tabSize: 4,

        }
    },
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    UserService,
    SolutionService,
    TaskService,
    TopicService,
    CmpMethodService,
    ConversationService,
    DatasetService,
    ListBaseService,
    MSService,
    MSRService,
    SearchService,
];

@NgModule({
    declarations: [],
    imports: [],
    providers: [...services]
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule
    ) {
        // throwIfAlreadyLoaded(parentModule, 'CoreModule');
        if(parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders {
    	return {
    		ngModule: CoreModule,
    		providers: [...services],
    	};
    }
}
