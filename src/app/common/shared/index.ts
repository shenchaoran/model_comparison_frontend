import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSharedModule } from '../ngx-shared';
import { NgUploaderModule } from 'ngx-uploader';
import { BaThemeConfig } from './theme.config';
import { BaThemeConfigProvider } from './theme.configProvider';
import { BACKEND } from '@config';
import { HEADER_MENUS, USER_MENUS } from '@config/menu.config';
import { DisqusModule } from "ngx-disqus";
import { EmailValidator, EqualPasswordsValidator } from './validators';
import { ListFilterService } from './components/list-template/list-filter.service';
import { HeaderMenuService } from './components/baHeaderMenu/services/baHeaderMenu.service';
import { BaMenuService } from './components/baHeaderMenu/services/baMenu.service';
import { LoginService } from '@feature/login/login.service';

import {
    FileUploader,
    ContextMenuComponent,
    HeaderPullRightComponent,
    IssueCardComponent,
    ModelCardComponent,
    SolutionCardComponent,
    TaskCardComponent,
    HeaderMenuLayoutComponent,
    ListTemplateComponent,
    FooterComponent,
    DocDetailTemplateComponent,
    TableFeatureComponent,
    BaHeaderMenuComponent,
    SubMenuComponent,
    TestRecurComponent,
} from './components';

import {
    BaScrollPosition,
    BaSlimScroll
} from './directives';

import {
    BaImageLoaderService,
    BaThemePreloader,
    BaThemeSpinner,
} from './services';

import {
    BaImgPathPipe,
    MomentDatePipe,
    UndefinedPipe,
    ResourceSrcPipe,
    StringLimitPipe
} from './pipes';

const NGA_SERVICES = [
    BaImageLoaderService,
    BaThemePreloader,
    BaThemeSpinner,
    ListFilterService,
    LoginService,
    BaMenuService,
];

const NGA_VALIDATORS = [EmailValidator, EqualPasswordsValidator];

const CITYFUN_COMPONENTS = [
    FileUploader,
    ContextMenuComponent,
    BaHeaderMenuComponent,
    HeaderPullRightComponent,
    ModelCardComponent,
    SolutionCardComponent,
    TaskCardComponent,
    IssueCardComponent,
    HeaderMenuLayoutComponent,
    ListTemplateComponent,
    FooterComponent,
    DocDetailTemplateComponent,
    TableFeatureComponent,
    SubMenuComponent,
    TestRecurComponent,
];

const CITYFUN_DIRECTIVES = [
    BaScrollPosition,
    BaSlimScroll
];

const CITYFUN_PIPES = [
    BaImgPathPipe,
    MomentDatePipe,
    ResourceSrcPipe,
    UndefinedPipe,
    StringLimitPipe
];

const CITYFUN_VALIDATORS = [EmailValidator, EqualPasswordsValidator];
const SERVICES = [HeaderMenuService];

export * from './components';

@NgModule({
    declarations: [
        ...CITYFUN_COMPONENTS,
        ...CITYFUN_DIRECTIVES,
        ...CITYFUN_PIPES
    ],
    imports: [
        RouterModule, 
        NgxSharedModule, 
        NgUploaderModule,
        DisqusModule.forRoot('shenchaoran')
    ],
    providers: [
        ...CITYFUN_VALIDATORS,
        ...SERVICES,
        {
            provide: 'BACKEND',
            useValue: {
                host: BACKEND.host,
                port: BACKEND.port
            }
        },
        {
            provide: 'HEADER_MENUS',
            useValue: HEADER_MENUS
        },
        {
            provide: 'USER_MENUS',
            useValue: USER_MENUS
        }
    ],
    exports: [
        ...CITYFUN_COMPONENTS, 
        ...CITYFUN_DIRECTIVES, 
        ...CITYFUN_PIPES, 
        NgxSharedModule,
        DisqusModule,
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: SharedModule,
            providers: [
                BaThemeConfigProvider,
                BaThemeConfig,
                ...NGA_VALIDATORS,
                ...NGA_SERVICES
            ]
        };
    }
}
