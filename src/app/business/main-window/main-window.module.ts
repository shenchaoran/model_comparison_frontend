import { NgModule } from '@angular/core';
import { NgUploaderModule } from 'ngx-uploader';
import { HotTableModule } from 'angular-handsontable';

import { DataInquireService } from "../../common/core/services/data.inquire.service";
import { MainWindowRoutingRoutes } from './main-window-routing.module';
import { NgxSharedModule } from '../../common/ngx-shared/ngx-shared.module';
import { SharedModule } from '../../common/shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../common/core/net/token/token.interceptor';
import { ResParserInterceptor } from '../../common/core/net/res-parser/res-parser.interceptor';
import { jqxTreeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxtree';
import { jqxExpanderComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxexpander';
import { jqxMenuComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxmenu';

import {
    MainWindowComponent,
    ManagerPanelComponent,
    ModelToolLibTreeComponent,
    ModelToolLibListComponent,
    DataToolLibListComponent,
    PropertyPanelComponent,
    DataListComponent,
    VisualListComponent,
} from './index';

import {
    ModelToolService,
    DataToolService,
    DataListService,
    VisualListService,
} from './services/index';

const COMPONENTS = [
    MainWindowComponent,
    ManagerPanelComponent,
    ModelToolLibTreeComponent,
    ModelToolLibListComponent,
    DataToolLibListComponent,
    PropertyPanelComponent,
    DataListComponent,
    VisualListComponent,
];

const SERVICES = [
    // DataInquireService,
    ModelToolService,
    DataToolService,
    DataListService,
    VisualListService,
];

@NgModule({
    imports: [
        NgxSharedModule,
        SharedModule,
        HotTableModule,
        NgUploaderModule,
        MainWindowRoutingRoutes,
    ],
    declarations: [
        ...COMPONENTS,
        jqxTreeComponent,
        jqxExpanderComponent,
        jqxMenuComponent,
    ],
    providers: [
        ...SERVICES,
        { provide: HTTP_INTERCEPTORS, useClass: ResParserInterceptor, multi: true},
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        
    ]
})
export class MainWindowModule {}
