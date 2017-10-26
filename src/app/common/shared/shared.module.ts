import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSharedModule } from '../ngx-shared/ngx-shared.module';


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
    // BaMessageBox,
    //
    // BaFloatWindow,
    // BaHouseholdTable
} from './components';

import {
	BaScrollPosition,
	BaSlimScroll,
	// BaThemeRun
} from './directives';

import {
    BaImgPathPipe,
    MomentDatePipe,
    DateStrFormatPipe
} from './pipes';

import {
	EmailValidator,
	EqualPasswordsValidator
} from './validators';

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
	// BaMessageBox,
	//
	// BaFloatWindow,
	// BaHouseholdTable
];

const CITYFUN_DIRECTIVES = [
	BaScrollPosition,
	BaSlimScroll
	// BaThemeRun
];

const CITYFUN_PIPES = [
    BaImgPathPipe,
    MomentDatePipe,
    DateStrFormatPipe
];

const CITYFUN_VALIDATORS = [
	EmailValidator,
	EqualPasswordsValidator
];

// const CITYFUN_SERVICES = [
// 	BaMenuService
// ];

@NgModule({
    declarations: [
        ...CITYFUN_COMPONENTS,
        ...CITYFUN_DIRECTIVES,
        ...CITYFUN_PIPES,
	],
    imports: [
        RouterModule,
        NgxSharedModule,

    ],
    providers: [
        ...CITYFUN_VALIDATORS,
    ],
    exports: [
        ...CITYFUN_COMPONENTS,
        ...CITYFUN_DIRECTIVES,
        ...CITYFUN_PIPES,
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
