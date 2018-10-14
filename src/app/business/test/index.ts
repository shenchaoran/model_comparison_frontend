import { NgModule } from '@angular/core';
import { TestRoutingModule } from './index-routing.module';
import { SiderNavComponent } from './sider-nav/sider-nav.component';
import { SharedModule } from '@common/shared';
import { TestComponent } from './test.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { FileUploaderTestComponent } from './file-uploader-test/file-uploader-test.component';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';
import { LeafletTestComponent } from './leaflet-test/leaflet-test.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { OlModule } from '../ol';
import { ConversationModule } from '../conversation';
import { ConversationService } from '@services'

@NgModule({
    imports: [
        TestRoutingModule,
        SharedModule,
        LeafletModule,
        OlModule,
        ConversationModule,
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
