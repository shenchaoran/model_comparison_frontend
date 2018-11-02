import { NgModule } from '@angular/core';
import { NgxSharedModule } from '../ngx-shared';
import { CheckBoxFormItemComponent } from './check-box-form-item/check-box-form-item.component';
// import { NzCheckboxModule } from 'ng-zorro-antd';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
    imports: [
        NgxSharedModule,
        // NzCheckboxModule,
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
