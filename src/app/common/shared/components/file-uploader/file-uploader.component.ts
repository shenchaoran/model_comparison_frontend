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
import {
    UploaderOptions,
    UploadInput,
    UploadOutput,
    UploadFile,
    UploadProgress,
    UploadStatus,
} from 'ngx-uploader';
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
    _uploadInput: UploadInput;

    uploadInputEmitter: EventEmitter<UploadInput>;
    files: UploadFile[];
    options: UploaderOptions;

    @Input() size: string = 'default';
    @Input() width;
    @Input() label = '';
    @Input() set uploadInput(v: UploadInput) {
        this._uploadInput = {
            ...v,
            url: `http://${this.backend.host}:${this.backend.port}${this.backend.API_prefix}${v.url}`
        };
    }
    @Output() onFileUploading = new EventEmitter<any>();
    @Output() onFileUploadCompleted = new EventEmitter<any>();
    @Output() onClear = new EventEmitter<any>();

    @ViewChild('fileUpload') public fileUploadRef: ElementRef;
    @ViewChild('inputText') public inputTextRef: ElementRef;
    @ViewChild('progressBar') public progressRef: ElementRef;

    public uploadFileInProgress: boolean;
    constructor(
        private renderer2: Renderer2,
        @Inject('BACKEND') private backend,
        //private _notice: NzNotificationService,
    ) {
        this._id = uuidv1();
        this.options = {
            concurrency: 1,
            maxUploads: 1
        };
        this.files = [];
        this.uploadInputEmitter = new EventEmitter<UploadInput>();
    }

    onUploadOutput(output: UploadOutput): void {
        if (output.type === 'allAddedToQueue') {
            // auto upload files when added
            this.uploadInputEmitter.emit(this._uploadInput);
        }
        else if (output.type === 'addedToQueue' && !!output.file) {
            this.files.push(output.file);
            const file = this.files[0];
            this.inputTextRef.nativeElement.value = file.name;
        }
        else if (output.type === 'start') {
            this.uploadFileInProgress = true;
            this.renderer2.setStyle(this.progressRef.nativeElement, 'width', 0);
            this.renderer2.setAttribute(this.progressRef.nativeElement, 'class', `form-progress ${this.size} form-progress-uploading`);
        }
        else if (output.type === 'uploading' && !!output.file) {
            const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
            this.files[index] = output.file;
            this.onFileUploading.emit(output);
            this.renderer2.setStyle(this.progressRef.nativeElement, 'width', output.file.progress.data.percentage + '%');
        }
        else if (output.type === 'done') {
            this.renderer2.setAttribute(this.progressRef.nativeElement, 'class', `form-progress ${this.size} ${output.file.response.error? 'form-progress-failed': 'form-progress-succeed'}`);
            this.onFileUploadCompleted.emit(output.file.response);
            // if (!response.error) {
            //     this.onFileUploadCompleted.emit({data: response.data});
            //     // this._notice.success('Success:', 'Upload succeed!');
            // } else {
            //     jQuery('#progress-' + this._id).addClass('form-progress-failed');
            //     this.onFileUploadCompleted.emit({error: response.error});
            //     // this._notice.warning('Warning:', 'Upload server error!');
            // }
        }
        else if (output.type === 'cancelled') { }
        else if (output.type === 'removed') { }
        else if (output.type === 'dragOver') { }
        else if (output.type === 'dragOut') { }
        else if (output.type === 'drop') { }
        else if (output.type === 'rejected' && !!output.file) { }
        this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
    }

    onBrowseFile(): boolean {
        // this.renderer.invokeElementMethod(this.fileUploadRef.nativeElement, 'click');
        this.fileUploadRef.nativeElement.click();
        return false;
    }

    onClearFile() {
        this.inputTextRef.nativeElement.value = '';
        this._showClose = false;
        this.renderer2.setStyle(this.progressRef.nativeElement, 'width', 0);
        this.renderer2.setAttribute(this.progressRef.nativeElement, 'class', `form-progress ${this.size}`);
        this.onClear.emit();
    }
}

export class UploadCfg {
    url: string;
    formData?: { [key: string]: any };
    fileData?: { [key: string]: any };
    headers?: { [key: string]: any };
    fieldName: string;
}