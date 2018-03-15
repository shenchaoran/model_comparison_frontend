import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LifeLoopComponent } from './life-loop/life-loop.component';
import { SiderNavComponent } from './sider-nav/sider-nav.component';
import { HeaderMenuLayoutComponent } from '@shared';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: 'life-loop',
                component: LifeLoopComponent
            },
            {
                path: 'sider-nav',
                component: SiderNavComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestRoutingModule {}
