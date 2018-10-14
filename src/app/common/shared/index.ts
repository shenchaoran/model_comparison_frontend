import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSharedModule } from '../ngx-shared';
import { NgUploaderModule } from 'ngx-uploader';
import { BaThemeConfig } from './theme.config';
import { BaThemeConfigProvider } from './theme.configProvider';
import { BACKEND } from '@config';
import { HEADER_MENUS, USER_MENUS, LOGIN_MENUS } from '@config';
import { DisqusModule } from "ngx-disqus";
import { MatSharedModule } from '../mat-shared';
// import { EmailValidator, EqualPasswordsValidator } from './validators';
import { ListFilterService } from './components/list-template/list-filter.service';
import { HeaderMenuService } from './components/header-menu/services/header-menu.service';
import { BaMenuService } from './components/header-menu/services/baMenu.service';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';

import {
    FileUploader,
    ContextMenuComponent,
    HeaderMenuLayoutComponent,
    ListTemplateComponent,
    FooterComponent,
    DocDetailTemplateComponent,
    TableFeatureComponent,
    SubMenuComponent,
    CmpTabsViewComponent,
    CmpDockingViewComponent,
    FileUploaderFormItemComponent,
    CheckBoxFormItemComponent,
    DocBaseComponent,
    OgmsBaseComponent,
    MapBaseComponent,
    CardsTemplateComponent,
    HeaderMenuComponent,
    MatCascaderSelectComponent,
    CascaderSelectValidator,
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
    BaMenuService,
    HeaderMenuService,
];

const VALIDATORS = [
    // CascaderSelectValidator,
    // EmailValidator,
    // EqualPasswordsValidator
];

const COMPONENTS = [
    FileUploader,
    ContextMenuComponent,
    HeaderMenuComponent,
    HeaderMenuLayoutComponent,
    ListTemplateComponent,
    FooterComponent,
    DocDetailTemplateComponent,
    TableFeatureComponent,
    SubMenuComponent,
    CmpTabsViewComponent,
    CmpDockingViewComponent,
    FileUploaderFormItemComponent,
    CheckBoxFormItemComponent,
    DocBaseComponent,
    OgmsBaseComponent,
    MapBaseComponent,
    CardsTemplateComponent,
    MatCascaderSelectComponent,
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

export * from '@common/shared/components';
export * from '@common/shared/services';
export * from '@common/shared/pipes';
export * from '@common/shared/directives';
// export * from './validators';

@NgModule({
    declarations: [
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES,
        ...VALIDATORS
    ],
    imports: [
        RouterModule,
        NgxSharedModule,
        NgUploaderModule,
        DisqusModule.forRoot('shenchaoran'),
        MatSharedModule,
    ],
    providers: [
        ...VALIDATORS,
        ...SERVICES,
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
        NzNotificationService
    ],
    exports: [
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES,
        RouterModule,
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
