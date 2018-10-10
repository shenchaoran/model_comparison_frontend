import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { ClarityModule } from "clarity-angular";
// import { map, filter, scan, take, toArray } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

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
    SlimLoadingBarModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,
    NgZorroAntdModule,
    QuillModule,
    SlimLoadingBarModule,
  ],
  providers: []
})
export class NgxSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxSharedModule
    };
  }
}
