import { NgModule } from '@angular/core';
import { NgxSharedModule } from '../ngx-shared';
import { CreateDocComponent } from './create-doc/create-doc.component';
import {
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,

} from '@angular/material';

@NgModule({
    imports: [
        NgxSharedModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
    ],
    declarations: [
        CreateDocComponent,
    ],
    exports: [
        CreateDocComponent,
    ]
})
export class CreateDocModule { }
