import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { ClarityModule } from "clarity-angular";
// import { map, filter, scan, take, toArray } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';
import { NgZorroAntdModule } from 'ng-zorro-antd';


import {
    PerfectScrollbarModule,
    PerfectScrollbarComponent,
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,

    NgZorroAntdModule,
    QuillModule,
    PerfectScrollbarModule,
    // ClarityModule.forChild(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,
    NgZorroAntdModule,
    QuillModule,
    PerfectScrollbarModule,
  ],
  providers: [
    {
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
]
})
export class NgxSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxSharedModule
    };
  }
}
