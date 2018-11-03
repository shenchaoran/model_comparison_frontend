import { NgModule } from '@angular/core';
import { TestRoutingModule } from './index-routing.module';
import { SiderNavComponent } from './sider-nav/sider-nav.component';
import { SharedModule } from '@shared';
import { TestComponent } from './test.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { FileUploaderTestComponent } from './file-uploader-test/file-uploader-test.component';
import { OlModule } from '../ol';
import { ConversationModule } from '../conversation';
import { MatCascaderModule } from '@shared/ogms-cascader';
import { TestTableComponent } from './test-table/test-table.component';
import { MatTableModule } from '@angular/material';
import { MatSharedModule } from '@mat-shared';

const modules = [
    TestRoutingModule,
    SharedModule,
    OlModule,
    ConversationModule,
    MatCascaderModule,
    MatTableModule,
    MatSharedModule,
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
