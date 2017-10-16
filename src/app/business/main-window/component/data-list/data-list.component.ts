import {
    Component,
    OnInit,
    Output,
    Renderer,
    ViewChild,
    ElementRef,
    EventEmitter
} from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';

import { DataInquireService } from "../../../../common/core/services/data.inquire.service";
import { DataListService } from '../../services/data-list.service';
import { SubMenu } from '../../../../common/shared/components/right-click-menu/sub-menu';

@Component({
    selector: 'app-data-list',
    templateUrl: './data-list.component.html',
    styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
    dataList: Array<any>;
    selectedLi;
    menuCfg: Array<SubMenu>;
    fileUploaderOptions: NgUploaderOptions;
    @ViewChild('fileUpload') public _fileUpload: ElementRef;
    @Output() onFileUpload = new EventEmitter<any>();
    @Output() onFileUploadCompleted = new EventEmitter<any>();
    public uploadFileInProgress: boolean;

    constructor(
        private dataListService: DataListService,
        private renderer: Renderer,
        private dataInquireService: DataInquireService
    ) {
        const postDataService = this.dataInquireService.getServiceById('postData');
        this.fileUploaderOptions = {
            url: postDataService.uid,
            data: {
                gd_tag: ''
            },
            fieldName: 'geo_data'
        };
    }

    ngOnInit() {
        this.menuCfg = this.dataListService.initContextMenuCfg();

        postal
            .channel('MENU_CHANNEL')
            .subscribe('data.add.raw', (data, envelope) => {
                console.log('data.add.raw');
                this.renderer.invokeElementMethod(
                    this._fileUpload.nativeElement,
                    'click'
                );
            });

        postal
            .channel('MENU_CHANNEL')
            .subscribe('data.add.UDX', (data, envelope) => {
                console.log('data.add.UDX');
                this.renderer.invokeElementMethod(
                    this._fileUpload.nativeElement,
                    'click'
                );
            });

        postal
            .channel('MENU_CHANNEL')
            .subscribe('menu.hide', (data, envelope) => {
                jQuery('#contextMenu').hide();
            });

        // window.onclick = (e: any) => {
        //     if (jQuery('#contextMenu').css('display') !== 'none') {
        //         if (e.target.id !== 'data-list-div') {
        //             jQuery('#contextMenu').hide();
        //         }
        //     }
        // };
    }

    onDataItemSelected(data) {
        this.selectedLi = data;
    }

    showMenu(e) {
        if (e.target.id === 'data-list-div') {
            e.stopPropagation();
            e.preventDefault();
            if (e.button === 0) {
                jQuery('#contextMenu')
                    .css({
                        top: e.clientY,
                        left: e.clientX
                    })
                    .show();
            }
            // else if (e.button === 0) {
            //     jQuery('#contextMenu').hide();
            // }
        }
    }

    beforeFileUpload(uploadingFile) {
        let files = this._fileUpload.nativeElement.files;
        if (files.length) {
            const file = files[0];
            this.uploadFileInProgress = true;
        }
    }

    _onFileUpload(data) {
        if (data['done'] || data['abort'] || data['error']) {
            this._onFileUploadCompleted(data);
        } else {
            this.onFileUpload.emit(data);
        }
    }

    _onFileUploadCompleted(data) {
        this.uploadFileInProgress = false;
        this.onFileUploadCompleted.emit(data);
    }
}
