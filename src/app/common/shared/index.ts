import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSharedModule } from '@common/ngx-shared';
import { NgUploaderModule } from 'ngx-uploader';
import { BaThemeConfig } from '@common/shared/theme.config';
import { BaThemeConfigProvider } from '@common/shared/theme.configProvider';
import { BACKEND } from '@config';
import { HEADER_MENUS, USER_MENUS } from '@config/menu.config';
import { DisqusModule } from "ngx-disqus";
import {MatSharedModule} from '@common/mat-shared';
// import { EmailValidator, EqualPasswordsValidator } from './validators';
import { ListFilterService } from '@common/shared/components/list-template/list-filter.service';
import { HeaderMenuService } from '@common/shared/components/header-menu/services/header-menu.service';
import { BaMenuService } from '@common/shared/components/header-menu/services/baMenu.service';
import { LoginService } from '@common/feature/login/login.service';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';

import {
    FileUploader,
    ContextMenuComponent,
    HeaderPullRightComponent,
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
} from '@common/shared/components';

import {
    BaScrollPosition,
    BaSlimScroll
} from '@common/shared/directives';

import {
    BaImageLoaderService,
    BaThemePreloader,
    BaThemeSpinner,
    ListBaseService,
} from '@common/shared/services';

import {
    BaImgPathPipe,
    MomentDatePipe,
    UndefinedPipe,
    ResourceSrcPipe,
    StringLimitPipe,
    ArrayFilterPipe,
    DescriptionPipe,
    CoordinatePipe,
} from '@common/shared/pipes';

const SERVICES = [
    BaImageLoaderService,
    BaThemePreloader,
    BaThemeSpinner,
    ListFilterService,
    LoginService,
    BaMenuService,
    HeaderMenuService,
    ListBaseService,
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
    HeaderPullRightComponent,
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
