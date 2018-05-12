import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@ngx-shared';
import { CommonModule } from '@angular/common';
import { TestRoutingModule } from './test-routing.module';
import { SiderNavComponent } from './sider-nav/sider-nav.component';
import { SharedModule } from '@shared';
import { TestComponent } from './test.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { FileUploaderTestComponent } from './file-uploader-test/file-uploader-test.component';

@NgModule({
    imports: [
        TestRoutingModule,
        SharedModule
    ],
    declarations: [
        SiderNavComponent,
        TestComponent,
        ReactiveFormComponent,
        FileUploaderTestComponent
    ],
    exports: []
})
export class TestModule { }
