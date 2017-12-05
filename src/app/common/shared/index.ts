import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSharedModule } from '../ngx-shared';

import { jqxTreeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxtree';
import { jqxExpanderComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxexpander';
import { jqxMenuComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxmenu';

import {
    BaCard,
    BaCopyright,
    BaPageTop,
    BaTitleTop,
    BaMenuItem,
    BaMenuHoverItem,
    BaMenu,
    BaSidebar,
    FileUploader,
    BaHeaderMenuComponent,
    TestRecurComponent,
    SubMenuComponent,
    ContextMenuComponent,
    HeaderPullRightComponent
    // BaMessageBox,
    //
    // BaFloatWindow,
    // BaHouseholdTable
} from './components';

import {
    BaScrollPosition,
    BaSlimScroll
    // BaThemeRun
} from './directives';

import { HeaderMenuService } from './components/baHeaderMenu/baHeaderMenu.service';

import { BaImgPathPipe, MomentDatePipe, DateStrFormatPipe } from './pipes';

import { EmailValidator, EqualPasswordsValidator } from './validators';

const CITYFUN_COMPONENTS = [
    BaCard,
    BaCopyright,
    BaPageTop,
    BaTitleTop,
    BaMenuItem,
    BaMenuHoverItem,
    BaMenu,

    BaSidebar,
    FileUploader,
    BaHeaderMenuComponent,
    TestRecurComponent,
    SubMenuComponent,
    ContextMenuComponent,
    HeaderPullRightComponent
    // BaMessageBox,
    //
    // BaFloatWindow,
    // BaHouseholdTable
];

const CITYFUN_DIRECTIVES = [
    BaScrollPosition,
    BaSlimScroll,
    // BaThemeRun
];

const CITYFUN_PIPES = [BaImgPathPipe, MomentDatePipe, DateStrFormatPipe];

const CITYFUN_VALIDATORS = [EmailValidator, EqualPasswordsValidator];

// const CITYFUN_SERVICES = [
// 	BaMenuService
// ];

@NgModule({
    declarations: [
        ...CITYFUN_COMPONENTS,
        ...CITYFUN_DIRECTIVES,
        ...CITYFUN_PIPES,
        HeaderPullRightComponent,
        jqxTreeComponent,
        jqxExpanderComponent,
        jqxMenuComponent,
    ],
    imports: [
        RouterModule, 
        NgxSharedModule,
    ],
    providers: [
        ...CITYFUN_VALIDATORS,
        HeaderMenuService,
    ],
    exports: [
        ...CITYFUN_COMPONENTS, 
        ...CITYFUN_DIRECTIVES, 
        ...CITYFUN_PIPES,
        jqxTreeComponent,
        jqxExpanderComponent,
        jqxMenuComponent,
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
