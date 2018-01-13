import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { OlMapComponent } from './ol-map.component';

const routes: Routes = [
    { 
        path: '',
        // component: LayoutComponent
        component: OlMapComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OlMapRoutingModule {}
