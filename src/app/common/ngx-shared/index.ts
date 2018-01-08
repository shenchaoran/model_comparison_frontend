import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';
// import { ClarityModule } from "clarity-angular";

import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,

    NgZorroAntdModule,
    PerfectScrollbarModule,
    QuillModule
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
  ],
  providers: [
    { provide: NZ_NOTIFICATION_CONFIG, useValue: { nzDuration: 3000, nzTop: '60px' } },
    NzNotificationService,]
})
export class NgxSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxSharedModule
    };
  }
}
