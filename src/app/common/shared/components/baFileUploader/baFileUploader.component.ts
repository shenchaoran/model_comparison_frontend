import { Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import * as uuidv1 from 'uuid/v1';
@Component({
  selector: 'ba-file-uploader',
  styleUrls: ['./baFileUploader.scss'],
  templateUrl: './baFileUploader.html',
})
export class BaFileUploader {
    _id: string;
    _showClose: boolean;
  @Input() fileUploaderOptions: NgUploaderOptions = { url: '' };
  @Output() onFileUpload = new EventEmitter<any>();
  @Output() onFileUploadCompleted = new EventEmitter<any>();
  @Output() onClear = new EventEmitter<any>();
  defaultValue: string = '';

  @ViewChild('fileUpload') public _fileUpload: ElementRef;
  @ViewChild('inputText') public _inputText: ElementRef;

  public uploadFileInProgress: boolean;
  constructor(private renderer: Renderer) { 
      this._id = uuidv1();
  }

  bringFileSelector(): boolean {
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }

  beforeFileUpload(uploadingFile): void {
    let files = this._fileUpload.nativeElement.files;
    if (files.length) {
        jQuery('#progress-' + this._id).css('width', 0);
        jQuery('#progress-' + this._id).removeClass('form-progress-failed');
        jQuery('#progress-' + this._id).addClass('form-progress-uploading');
      const file = files[0];
      this._onChangeFileSelect(files[0])
      if (!this._canFleUploadOnServer()) {
        uploadingFile.setAbort();
      } else {
        this.uploadFileInProgress = true;
      }
    }
  }

  _onChangeFileSelect(file) {
    this._inputText.nativeElement.value = file.name
  }

  _onFileUpload(data): void {
    if (data['done'] || data['abort'] || data['error']) {
      this._onFileUploadCompleted(data);
    } else {
      this.onFileUpload.emit(data);
      jQuery('#progress-' + this._id).css('width', data.progress.percent + '%');
    }
  }

  _onFileUploadCompleted(data): void {
      this._showClose = true;
    this.uploadFileInProgress = false;
    this.onFileUploadCompleted.emit(data);

    if (!data.abort && data.done && !data.error) {
        
    }
    else {
        jQuery('#progress-' + this._id).removeClass('form-progress-uploading');
        jQuery('#progress-' + this._id).addClass('form-progress-failed');
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
