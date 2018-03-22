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
    CmpTagsViewComponent,
    CmpDockingViewComponent,
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
    StringLimitPipe,
    ArrayFilterPipe,
    DescriptionPipe,
    CoordinatePipe,
} from './pipes';

const SERVICES = [
    BaImageLoaderService,
    BaThemePreloader,
    BaThemeSpinner,
    ListFilterService,
    LoginService,
    BaMenuService,
    HeaderMenuService,
];

const VALIDATORS = [EmailValidator, EqualPasswordsValidator];

const COMPONENTS = [
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
    CmpTagsViewComponent,
    CmpDockingViewComponent,
];

const DIRECTIVES = [
    BaScrollPosition,
    BaSlimScroll
];

const PIPES = [
    BaImgPathPipe,
    MomentDatePipe,
    ResourceSrcPipe,
    UndefinedPipe,
    StringLimitPipe,
    ArrayFilterPipe,
    DescriptionPipe,
    CoordinatePipe,
];

export * from './components';

@NgModule({
    declarations: [
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES
    ],
    imports: [
        RouterModule, 
        NgxSharedModule, 
        NgUploaderModule,
        DisqusModule.forRoot('shenchaoran')
    ],
    providers: [
        ...VALIDATORS,
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
        ...COMPONENTS, 
        ...DIRECTIVES, 
        ...PIPES, 
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
                ...SERVICES
            ]
        };
    }
}
