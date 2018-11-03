import { NgModule } from '@angular/core';
import { NgxSharedModule } from '../ngx-shared';
import { CheckBoxFormItemComponent } from './check-box-form-item/check-box-form-item.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
    imports: [
        NgxSharedModule,
        NgZorroAntdModule,
    ],
    declarations: [
        CheckBoxFormItemComponent,
    ],
    exports: [
        CheckBoxFormItemComponent,
    ]
})
export class FormControlItemModule { }
