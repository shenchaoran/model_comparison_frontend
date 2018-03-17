import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@ngx-shared';
import { CommonModule } from '@angular/common';
import { LifeLoopComponent } from './life-loop/life-loop.component';
import { TestRoutingModule } from './test-routing.module';
import { SiderNavComponent } from './sider-nav/sider-nav.component';
import { SharedModule } from '@shared';
import { TestComponent } from './test.component';

@NgModule({
    imports: [NgxSharedModule, TestRoutingModule, SharedModule],
    declarations: [LifeLoopComponent, SiderNavComponent, TestComponent],
    exports: [LifeLoopComponent]
})
export class TestModule {}
