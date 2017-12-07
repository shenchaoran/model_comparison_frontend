import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { ClarityModule } from "clarity-angular";

import { TranslateModule } from "@ngx-translate/core";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { QuillModule } from 'ngx-quill'

@NgModule({
    declarations: [

	],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        HttpClientModule,

        NgZorroAntdModule.forRoot(),
        PerfectScrollbarModule,
        QuillModule,
        // ClarityModule.forChild(),
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        TranslateModule,
        PerfectScrollbarModule,
        NgZorroAntdModule,
        QuillModule,
        // ClarityModule,
    ]
})
export class NgxSharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgxSharedModule
        };
    }
}
