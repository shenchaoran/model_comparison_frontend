import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSharedModule } from '../ngx-shared';
import { NgxUploaderModule } from 'ngx-uploader';
import { MatSharedModule } from '../mat-shared';
import { ListFilterService } from './components/list-template/list-filter.service';
import { HeaderMenuService } from './components/header-menu/services/header-menu.service';

import {
    FileUploader,
    HeaderMenuLayoutComponent,
    ListTemplateComponent,
    FooterComponent,
    TableFeatureComponent,
    SubMenuComponent,
    CmpTabsViewComponent,
    CmpDockingViewComponent,
    FileUploaderFormItemComponent,
    CheckBoxFormItemComponent,
    MapBaseComponent,
    CardsTemplateComponent,
    HeaderMenuComponent,
    MatCascaderSelectComponent,
    CascaderSelectValidator,
    SidebarSectionComponent,
    SiderbarMenuModalComponent,
    DetailLayoutComponent,
    CreateDocComponent,
} from './components';

import {
    RxBoxDirective,
    Flex10Directive,
    AsideDirective,
    LoadingDirective,
} from './directives';

import {
    MomentDatePipe,
    UndefinedPipe,
    ResourceSrcPipe,
    StringLimitPipe,
    ArrayFilterPipe,
    DescriptionPipe,
    CoordinatePipe,
} from './pipes';

const services = [
    ListFilterService,
    HeaderMenuService,
];

const validators = [
    CascaderSelectValidator,
];

const components = [
    FileUploader,
    HeaderMenuComponent,
    HeaderMenuLayoutComponent,
    ListTemplateComponent,
    FooterComponent,
    TableFeatureComponent,
    SubMenuComponent,
    CmpTabsViewComponent,
    CmpDockingViewComponent,
    FileUploaderFormItemComponent,
    CheckBoxFormItemComponent,
    MapBaseComponent,
    CardsTemplateComponent,
    MatCascaderSelectComponent,
    SidebarSectionComponent,
    SiderbarMenuModalComponent,
    DetailLayoutComponent,
    CreateDocComponent,
];

const directives = [
    RxBoxDirective,
    Flex10Directive,
    AsideDirective,
    LoadingDirective,
];

const pipes = [
    MomentDatePipe,
    ResourceSrcPipe,
    UndefinedPipe,
    StringLimitPipe,
    ArrayFilterPipe,
    DescriptionPipe,
    CoordinatePipe,
];

export * from '@shared/components';
export * from '@shared/pipes';
export * from '@shared/directives';
export * from './classes';
export * from './validators';

@NgModule({
    declarations: [
        ...components,
        ...directives,
        ...pipes,
        ...validators
    ],
    imports: [
        RouterModule,
        NgxSharedModule,
        NgxUploaderModule,
        MatSharedModule,
    ],
    providers: [
        ...validators,
        ...services,
    ],
    exports: [
        ...components,
        ...directives,
        ...pipes,
        RouterModule,
        NgxSharedModule,
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: SharedModule,
            providers: [
                ...services
            ]
        };
    }
}
