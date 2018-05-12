import { Component, OnInit } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { ResourceSrc } from '@models';

@Component({
    selector: 'ogms-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
    date;
    fileUploaderOptions: NgUploaderOptions;
    select;
    
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

    onDateChange(e) {
        // console.log(e);
        // console.log(this.date);
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
