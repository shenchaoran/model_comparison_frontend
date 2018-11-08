import { NgModule } from '@angular/core';
import { NgxSharedModule } from '../ngx-shared';
import { CheckBoxFormItemComponent } from './check-box-form-item/check-box-form-item.component';
import { MatCheckboxModule } from '@angular/material';

@NgModule({
    imports: [
        NgxSharedModule,
        MatCheckboxModule,
    ],
    declarations: [
        CheckBoxFormItemComponent,
    ],
    exports: [
        CheckBoxFormItemComponent,
    ]
})
export class FormControlItemModule { }
