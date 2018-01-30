import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSharedModule } from '../ngx-shared';
import { NgUploaderModule } from 'ngx-uploader';
import { jqxTreeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtree';
import { jqxExpanderComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxexpander';
import { jqxMenuComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxmenu';
import { jqxListBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxlistbox';
import { BaThemeConfig } from './theme.config';
import { BaThemeConfigProvider } from './theme.configProvider';
import { BACKEND } from '@config';

import {
  BaCard,
  BaCopyright,
  BaPageTop,
  BaTitleTop,
  BaMenuItem,
  BaMenuHoverItem,
  BaMenu,
  BaSidebar,
  BaFileUploader,
  FileUploader,
  BaHeaderMenuComponent,
  TestRecurComponent,
  SubMenuComponent,
  ContextMenuComponent,
  HeaderPullRightComponent,
  DataCardComponent,
  ModelCardComponent,
  SolutionCardComponent,
  TaskCardComponent
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

import {
  BaImageLoaderService,
  BaMenuService,
  BaThemePreloader,
  BaThemeSpinner
} from './services';

import { HeaderMenuService } from './components/baHeaderMenu/baHeaderMenu.service';

import {
  BaImgPathPipe,
  MomentDatePipe,
  UndefinedPipe,
  ResourceSrcPipe
} from './pipes';

import { EmailValidator, EqualPasswordsValidator } from './validators';

const NGA_SERVICES = [
  BaImageLoaderService,
  BaThemePreloader,
  BaThemeSpinner,
  BaMenuService
];

const NGA_VALIDATORS = [EmailValidator, EqualPasswordsValidator];

const CITYFUN_COMPONENTS = [
  BaCard,
  BaCopyright,
  BaPageTop,
  BaTitleTop,
  BaMenuItem,
  BaMenuHoverItem,
  BaMenu,
  BaFileUploader,

  BaSidebar,
  FileUploader,
  BaHeaderMenuComponent,
  TestRecurComponent,
  SubMenuComponent,
  ContextMenuComponent,
  HeaderPullRightComponent,

  jqxTreeComponent,
  jqxExpanderComponent,
  jqxMenuComponent,
  jqxListBoxComponent,
  DataCardComponent,
  ModelCardComponent,
  SolutionCardComponent,
  TaskCardComponent
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

const CITYFUN_PIPES = [BaImgPathPipe, MomentDatePipe, ResourceSrcPipe, UndefinedPipe];

const CITYFUN_VALIDATORS = [EmailValidator, EqualPasswordsValidator];
const SERVICES = [HeaderMenuService];

///////////////
export * from './components';


// const CITYFUN_SERVICES = [
// 	BaMenuService
// ];

@NgModule({
  declarations: [
    ...CITYFUN_COMPONENTS,
    ...CITYFUN_DIRECTIVES,
    ...CITYFUN_PIPES
  ],
  imports: [RouterModule, NgxSharedModule, NgUploaderModule],
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
    ],
  exports: [...CITYFUN_COMPONENTS, ...CITYFUN_DIRECTIVES, ...CITYFUN_PIPES]
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
