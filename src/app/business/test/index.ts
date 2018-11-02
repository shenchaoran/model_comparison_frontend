import { NgModule } from '@angular/core';
import { OlModule } from '../ol';
import { 
    HeaderMenuLayoutModule,
    FileUploaderModule,
    MatCascaderModule,
    NgxSharedModule,
    DirectivesModule,
 } from '@shared';
import {
    // NzAnchorModule,
    // NzFormModule,
    // NzInputModule,
    NgZorroAntdModule,
} from 'ng-zorro-antd';
import {
    MatTableModule,
} from '@angular/material';
import { TestRoutingModule } from './index-routing.module';

import { SiderNavComponent } from './sider-nav/sider-nav.component';
import { TestComponent } from './test.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { FileUploaderTestComponent } from './file-uploader-test/file-uploader-test.component';
import { ConversationModule } from '../conversation';
import { TestTableComponent } from './test-table/test-table.component';

const modules = [
    NgxSharedModule,
    // NzAnchorModule,
    // NzFormModule,
    // NzInputModule,
    NgZorroAntdModule,
    FileUploaderModule,
    TestRoutingModule,
    OlModule,
    ConversationModule,
    MatCascaderModule,
    MatTableModule,
    HeaderMenuLayoutModule,
    DirectivesModule,
];
const components = [
    SiderNavComponent,
    TestComponent,
    ReactiveFormComponent,
    FileUploaderTestComponent,
    TestTableComponent,
];
const services = [];

@NgModule({
    imports: [...modules],
    declarations: [...components],
    providers: [...services]
})
export class TestModule { }
