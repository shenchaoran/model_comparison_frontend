import {
    NgModule,
    ModuleWithProviders,
    Optional,
    SkipSelf
} from '@angular/core';
import { NgxSharedModule } from '@shared';
import { HttpClientModule } from '@angular/common/http';
import { HEADER_MENUS, USER_MENUS, LOGIN_MENUS, BACKEND } from '@config';
import { DynamicTitleService } from '@core/services';
import { _HttpClient } from '@core/services/http.client';
import { MatSnackBar } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
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
} from '@core/services';

export * from './services';

const services = [
    AuthGuard,
    DynamicTitleService,
    _HttpClient,
    {
        provide: 'BACKEND',
        useValue: {
            host: BACKEND.host,
            port: BACKEND.port,
            API_prefix: BACKEND.API_prefix
        }
    },
    {
        provide: 'HEADER_MENUS',
        useValue: HEADER_MENUS
    },
    {
        provide: 'USER_MENUS',
        useValue: USER_MENUS
    },
    {
        provide: 'LOGIN_MENUS',
        useValue: LOGIN_MENUS
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
    MatSnackBar,
];

@NgModule({
    declarations: [],
    imports: [ 
        HttpClientModule,
        OverlayModule,
        NgxSharedModule,
    ],
    providers: [...services]
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule
    ) {
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
