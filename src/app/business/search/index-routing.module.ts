import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search.component';
import { FiltersComponent } from './filters/filters.component';
import { HeaderMenuLayoutComponent } from '@common/shared';

const routes: Routes = [
    { 
        path: '', 
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: SearchComponent
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class SearchRoutingModule {
}