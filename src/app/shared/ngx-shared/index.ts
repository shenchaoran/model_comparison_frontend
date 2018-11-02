import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';

const modules = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroAntdModule,
]
@NgModule({
    declarations: [
    ],
    imports: [
        ...modules
    ],
    exports: [
        ...modules
    ],
    providers: []
})
export class NgxSharedModule {}
