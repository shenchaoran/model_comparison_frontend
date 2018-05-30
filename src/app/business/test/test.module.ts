import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@ngx-shared';
import { CommonModule } from '@angular/common';
import { TestRoutingModule } from './test-routing.module';
import { SiderNavComponent } from './sider-nav/sider-nav.component';
import { SharedModule } from '@shared';
import { TestComponent } from './test.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { FileUploaderTestComponent } from './file-uploader-test/file-uploader-test.component';
import { VisualizationModule } from '../visualization/visualization.module';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';
import { LeafletTestComponent } from './leaflet-test/leaflet-test.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
    imports: [
        TestRoutingModule,
        SharedModule,
        VisualizationModule,
        LeafletModule,
    ],
    declarations: [
        SiderNavComponent,
        TestComponent,
        ReactiveFormComponent,
        FileUploaderTestComponent,
        LeafletTestComponent
    ],
    providers: [
        NzNotificationService,
    ],
    exports: []
})
export class TestModule { }
