import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@ngx-shared';
import { CommonModule } from '@angular/common';
import { TestRoutingModule } from './test-routing.module';
import { SiderNavComponent } from './sider-nav/sider-nav.component';
import { SharedModule } from '@shared';
import { TestComponent } from './test.component';

@NgModule({
    imports: [NgxSharedModule, TestRoutingModule, SharedModule],
    declarations: [SiderNavComponent, TestComponent],
    exports: []
})
export class TestModule {}
