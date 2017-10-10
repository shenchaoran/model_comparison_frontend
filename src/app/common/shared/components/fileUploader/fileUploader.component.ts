import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'file-uploader-component',
    templateUrl: 'fileUploader.component.html',
    styleUrls: ['fileUploader.component.css']
})

export class FileUploader implements OnInit {
  @Input() fname: string;
  files: Array<any> = null;
  _isDisabled: Boolean = true;

  constructor() {
    this.files = [];
  }

  ngOnInit() {
  }

  selectFiles(){
    jQuery('#upload').click();
  }

  clearFiles(){
    this.files = [];
    this._isDisabled = true;
    jQuery('#upload').val('');
  }

  handleFiles(files){
    this.files = files;
    if(files.length){
      this._isDisabled = false;
    }
  }

  startUpload(){
    let self = this;
    if(this.files.length === 0){
      alert('请选择文件！')
    }
    else{
      let formData = new FormData();
      formData.append(this.fname, this.files[0]);
      let xhr_provider = function() {
        let xhr = jQuery.ajaxSettings.xhr();
        if(onprogress && xhr.upload) {
            xhr.upload.addEventListener('progress', self.onprogress, false);
        }
        return xhr;
      };

      // const uploadURL = 'http://192.168.2.8:8088/XCIEDR/cf/service/task/report?apikey=111';
      const uploadURL = 'http://192.168.2.135:8000/server/index.php?g=Web&c=Mock&o=success&mockCode=DDKCLbIPkdF9wBXWn5EMZc4EPeKbV2DA';
      jQuery.ajax({
        url: uploadURL,
        data: formData,
        type: 'POST',
        contentType: 'multipart/form-data',
        dataType: 'json'
        // xhr: xhr_provider
      })
        .done( res => {
          console.log(res);
        })
        .fail( err => {
          console.log(err);
        })

    }
  }

  private onprogress(evt){
    console.log(evt);
  }
}
