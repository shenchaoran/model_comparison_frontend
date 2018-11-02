import { NgModule } from '@angular/core';
import { NgxSharedModule } from '../ngx-shared';
import { NgxUploaderModule } from 'ngx-uploader';
import { FileUploader } from './file-uploader/file-uploader.component';
import { FileUploaderFormItemComponent } from './file-uploader-form-item/file-uploader-form-item.component';

@NgModule({
    imports: [
        NgxSharedModule,
        NgxUploaderModule,
    ],
    declarations: [
        FileUploader,
        FileUploaderFormItemComponent,
    ],
    exports: [
        FileUploader,
        FileUploaderFormItemComponent,
    ]
})
export class FileUploaderModule { }
