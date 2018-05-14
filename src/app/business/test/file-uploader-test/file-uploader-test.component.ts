import { Component, OnInit } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { ResourceSrc } from '@models';

@Component({
  selector: 'ogms-file-uploader-test',
  templateUrl: './file-uploader-test.component.html',
  styleUrls: ['./file-uploader-test.component.scss']
})
export class FileUploaderTestComponent implements OnInit {

    fileUploaderOptions: NgUploaderOptions;
    fileId;

    checkOptionsOne = [
        { label: 'Apple', value: 'Apple', checked: true },
        { label: 'Pear', value: 'Pear', checked: false },
        { label: 'Orange', value: 'Orange', checked: false }
      ];

    constructor() {
        this.fileUploaderOptions = {
            url: '/data',
            data: {
                desc: '',
                src: ResourceSrc.EXTERNAL
                // userId: JSON.parse(localStorage.getItem('jwt')).user._id
            },
            multiple: true,
            fieldName: 'geo-data',
            customHeaders: {
                // Authorization:
                // 'bearer ' + JSON.parse(localStorage.getItem('jwt')).token
            }
        };
    }

    ngOnInit() {
    }

    onUploaded(id) {
        console.log(id);
        this.fileId = id;
    }

    _onFileUpload(e, msId, eventId) {

    }

    _onFileUploadCompleted(data, msId, eventId) {
        if (data.error) {

        }
        else {

        }
    }

    _onClearUploaded(msId, eventId) {

    }
}
