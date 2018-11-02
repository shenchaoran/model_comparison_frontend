import { NgModule } from '@angular/core';
import { NgxSharedModule } from '../ngx-shared';
import { DetailLayoutComponent } from './detail-layout/detail-layout.component';
import { DirectivesModule } from '../directives';

@NgModule({
    imports: [
        NgxSharedModule,
        DirectivesModule,
    ],
    declarations: [
        DetailLayoutComponent,
    ],
    exports: [
        DetailLayoutComponent,
    ]
})
export class DetailLayoutModule { }
