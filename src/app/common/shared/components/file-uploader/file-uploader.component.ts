import {
    Component,
    ViewChild,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    Renderer2,
    Inject,
} from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import * as uuidv1 from 'uuid/v1';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
    selector: 'ogms-file-uploader',
    styleUrls: ['./file-uploader.component.scss'],
    templateUrl: './file-uploader.component.html'
})
export class FileUploader {
    _id: string;
    _showClose: boolean;
    _fileUploaderOptions:NgUploaderOptions = { url: '' };
    @Input() size: string = 'default';
    @Input() width;
    @Input()
    set fileUploaderOptions(v) {
        this._fileUploaderOptions = _.cloneDeep(v);
        this._fileUploaderOptions.url = `http://${this.backend.host}:${this.backend.port}${v.url}`;
    };
    get fileUploaderOptions() {
        return this._fileUploaderOptions;
    }
    @Output() onFileUploading = new EventEmitter<any>();
    @Output() onFileUploadCompleted = new EventEmitter<any>();
    @Output() onClear = new EventEmitter<any>();
    defaultValue: string = '';

    @ViewChild('fileUpload') public _fileUpload: ElementRef;
    @ViewChild('inputText') public _inputText: ElementRef;

    public uploadFileInProgress: boolean;
    constructor(
        private renderer: Renderer2,
        @Inject('BACKEND') private backend,
        private _notice: NzNotificationService,
    ) {
        this._id = uuidv1();
    }

    bringFileSelector(): boolean {
        // this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
        this._fileUpload.nativeElement.click();
        return false;
    }

    beforeFileUpload(uploadingFile): void {
        let files = this._fileUpload.nativeElement.files;
        if (files.length) {
            jQuery('#progress-' + this._id).css('width', 0);
            jQuery('#progress-' + this._id).removeClass('form-progress-failed');
            jQuery('#progress-' + this._id).addClass('form-progress-uploading');
            const file = files[0];
            this._onChangeFileSelect(files[0]);
            if (!this._canFleUploadOnServer()) {
                uploadingFile.setAbort();
            } else {
                this.uploadFileInProgress = true;
            }
        }
    }

    _onChangeFileSelect(file) {
        this._inputText.nativeElement.value = file.name;
    }

    _onFileUpload(data): void {
        if (data['done'] || data['abort'] || data['error']) {
            this._onFileUploadCompleted(data);
        } else {
            this.onFileUploading.emit(data);
            jQuery('#progress-' + this._id).css(
                'width',
                data.progress.percent + '%'
            );
        }
    }

    _onFileUploadCompleted(data): void {
        this._showClose = true;
        this.uploadFileInProgress = false;

        if (!data.abort && data.done && !data.error) {
            const response = JSON.parse(data.response);
            if (_.startsWith(_.get(response, 'status.code'), '200')) {
                this.onFileUploadCompleted.emit({
                    data: response.data
                });
                this._notice.success('Success:', 'Upload succeed!');
            } else {
                this.onFileUploadCompleted.emit({
                    error: 'upload failed'
                });
                this._notice.warning('Warning:', 'Upload server error!');
            }
        } else {
            jQuery('#progress-' + this._id).removeClass(
                'form-progress-uploading'
            );
            jQuery('#progress-' + this._id).addClass('form-progress-failed');

            this.onFileUploadCompleted.emit({
                error: 'upload failed'
            });
            this._notice.warning('Warning:', data.abort? 'Upload is aborted!': 'Upload failed!');
        }
    }

    _canFleUploadOnServer(): boolean {
        return !!this.fileUploaderOptions['url'];
    }

    clearUploaded() {
        this._inputText.nativeElement.value = '';
        this._showClose = false;
        jQuery('#progress-' + this._id).removeClass('form-progress-uploading');
        jQuery('#progress-' + this._id).removeClass('form-progress-failed');
        jQuery('#progress-' + this._id).css('width', 0);
        this.onClear.emit();
    }
}
