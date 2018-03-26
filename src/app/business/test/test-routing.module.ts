import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiderNavComponent } from './sider-nav/sider-nav.component';
import { HeaderMenuLayoutComponent } from '@shared';
import { TestComponent } from './test.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: TestComponent,
                children: [
                    {
                        path: 'sider-nav',
                        component: SiderNavComponent
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestRoutingModule {}
