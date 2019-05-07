import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderMenuLayoutComponent } from '@shared';
import { MSService } from '@services/ms.service';
import { SiteReplAppComponent } from './site-repl-app/site-repl-app.component';
import { RegionReplAppComponent } from './region-repl-app/region-repl-app.component'

const routes: Routes = [
    {
        path: '',
        component: SiteReplAppComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OlRoutingModule { }
