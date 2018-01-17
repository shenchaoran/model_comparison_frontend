import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@ngx-shared';
import { CommonModule } from '@angular/common';
import { LifeLoopComponent } from './life-loop/life-loop.component';
import { TestRoutingModule } from './test-routing.module';

@NgModule({
  imports: [
    NgxSharedModule,
    TestRoutingModule,
  ],
  declarations: [LifeLoopComponent],
  exports: [LifeLoopComponent]
})
export class TestModule { }
