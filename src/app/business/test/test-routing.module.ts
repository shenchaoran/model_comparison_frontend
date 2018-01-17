import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LifeLoopComponent } from './life-loop/life-loop.component';

import {
  SiderMenuLayoutComponent,
  HeaderMenuLayoutComponent
} from '@common/layout';

const routes: Routes = [
  {
    path: 'life-loop',
    component: LifeLoopComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule {}
