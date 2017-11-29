import {
    Component,
    OnInit,
    Output,
    Renderer,
    ViewChild,
    ElementRef,
    EventEmitter,
    AfterViewInit
} from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { NzNotificationService } from 'ng-zorro-antd';
import { HttpHeaders } from '@angular/common/http';

import { DataInquireService } from '../../../../common/core/services/data.inquire.service';
import { DataListService, ContextMenuType } from '../../services/data-list.service';
import { SubMenu } from '../../../../common/shared/components/context-menu/sub-menu';
import { GeoDataType, GeoData } from './geo-data';
import { TreeItem } from '../visual-list/tree-item.class';
import { TreeItemType } from '../visual-list/tree-item-type.enum';
import { MenuItem } from '../visual-list/menu-item.class';
import { jqxMenuComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxmenu';
import { ErrorHandle } from '../../../../common/core/base/error-handle';

@Component({
    selector: 'njgis-data-list',
    templateUrl: './data-list.component.html',
    styleUrls: ['./data-list.component.scss']
})
export class DataListComponent extends ErrorHandle implements OnInit, AfterViewInit {
    // ul list
    dataList: Array<GeoData> = [];
    selectedLi;
    
    // file upload
    uploadProgress: number = 0;
    fileUploaderOptions: NgUploaderOptions;
    @ViewChild('fileUpload') public _fileUpload: ElementRef;
    @Output() onFileUpload = new EventEmitter<any>();
    @Output() onFileUploadCompleted = new EventEmitter<any>();
    acceptedType: string = undefined;

    // context menu
    @ViewChild('jqxMenu') jqxMenu: jqxMenuComponent;
    contextMenuCfg: Array<TreeItem> = [];
    _flatenItems: Array<TreeItem> = [];               // 没有嵌套关系的item list

    // compare
    leftData: GeoData = undefined;
    rightData: GeoData = undefined;

    constructor(
        private dataListService: DataListService,
        private renderer: Renderer,
        private dataInquireService: DataInquireService,
        private _notification: NzNotificationService
    ) {
        super();
        // this.acceptedType = 'application/zip, application/xml, text/plain, .csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        this.acceptedType = '*.*';
        const postDataService = this.dataInquireService.getServiceById(
            'postData'
        );
        this.fileUploaderOptions = {
            url: postDataService,
            data: {
                tag: '',
                type: ''
            },
            multiple: true,
            fieldName: 'geo_data',
            customHeaders: {
                'Authorization': 'bearer ' + JSON.parse(localStorage.getItem('jwt')).token
            }
        };
    }

    ngOnInit() {
        this.registerContextMenuEvent();

        postal
            .channel('DATA_CHANNEL')
            .subscribe('data.add', (data, envelope) => {
                this.dataList = _.concat(this.dataList, data);
            });

        postal
            .channel('DATA_CHANNEL')
            .subscribe('data.download', (data, envelope) => {
                // 此处将Authorization放在query中
                const downloadService = this.dataInquireService.getServiceById('downloadData', {id: data._id}, {filename: data.filename}, true);
                // this.dataListService.downloadUDX(downloadService);
                window.open(downloadService);
            });

        postal
            .channel('DATA_CHANNEL')
            .subscribe('data.close', (data, envelope) => {
                _.remove(this.dataList, item => {
                    return item._id === data._id;
                });
                // TODO others clear operation
            });

        postal
            .channel('DATA_CHANNEL')
            .subscribe('data.property', (data, envelope) => {
                const selected = _.find(this.dataList, item => item._id === data._id);
                this.onDataToolClick(selected);
            });
    }

    registerContextMenuEvent() {
        postal
            .channel('MENU_CHANNEL')
            .subscribe('data.add.raw', (data, envelope) => {
                // console.log('data.add.raw');
                // TODO set input accept type
                // this.acceptedType = 'application/zip, .csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                this.acceptedType = '*.*';
                this.fileUploaderOptions.data.type = GeoDataType.RAW;
                this.uploadProgress = 0;
                this.renderer.invokeElementMethod(
                    this._fileUpload.nativeElement,
                    'click'
                );
            });

        postal
            .channel('MENU_CHANNEL')
            .subscribe('data.add.UDX', (data, envelope) => {
                this.acceptedType = 'application/xml';
                this.fileUploaderOptions.data.type = GeoDataType.UDX;
                // console.log('data.add.UDX');
                // TODO set input accept type
                this.uploadProgress = 0;
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

        postal
            .channel('COMPARE_CHANNEL')
            .subscribe('data.left', (data, envelope) => {
                this.leftData = data;
                this.rightData = undefined;
            });

        postal
            .channel('COMPARE_CHANNEL')
            .subscribe('data.right', (data, envelope) => {
                this.rightData = data;
                this.dataListService.compareUDX(this.leftData, this.rightData)
                    .subscribe({
                        next: response => {
                            if (_.startsWith(_.get(response, 'status.code'), '200')) {
                                postal
                                    .channel('PROP_CHANNEL')
                                    .publish('compare-prop.bind', {
                                        parsed: response.data,
                                        left: this.leftData,
                                        right: this.rightData
                                    });
                            }
                            else {
                                this._notification.create(
                                    'warning',
                                    'Warning:',
                                    'comparing data failed, please retry later!'
                                );
                            }
                        },
                        error: err => {
                            this.handleError(err);
                            this._notification.create(
                                'warning',
                                'Warning:',
                                'comparing data failed, please retry later!'
                            );
                        }
                    });
            });
    }

    ngAfterViewInit() {}

    showMenu(e: any, menuType: ContextMenuType, geoData?: GeoData) {
        // this.jqxMenu.restore();
        // TODO 可能要写两个context menu才行，两个高度不一样，数据绑定后没有自动刷新
        this.contextMenuCfg = this.dataListService.getContextMenuCfg(menuType, geoData);
        this.addCompareMenu(geoData);
        this.flatenContextMenuCfg();
        this.jqxMenu.open(parseInt(e.clientX), parseInt(e.clientY));
        
        // if (e.target.id === 'data-list-div') {
            // jQuery('#contextMenu')
            //     .css({
            //         top: e.clientY,
            //         left: e.clientX
            //     })
            //     .show();
            e.preventDefault();
            e.stopPropagation();
            e.cancelBubble = true;
        // }
        return false;
    }

    onMenuItemClick(event) {
        let itemId = event.args.id;
        if (itemId != null) {
            const item = this.getContextMenuItem(itemId);
            const postalInfo = item.data.postalInfo;
            const substrs = postalInfo.split('#');
            postal
                .channel(substrs[0])
                .publish(substrs[1], item.data.params)
        }
    }

    flatenContextMenuCfg() {
        const flatItems = [];
        const flatenItem = (item) => {
            if(item.items.length === 0) {
                flatItems.push(item);
            }
            else {
                _.map(item.items, flatenItem);
            }
        };
        if(this.contextMenuCfg.length) {
            _.map(this.contextMenuCfg, flatenItem);
            this._flatenItems = flatItems;
        }
        else {
            this._flatenItems = [];
        }
    }

    addCompareMenu(geoData: GeoData) {
        if(geoData) {
            let currentCfg = _.cloneDeep(this.contextMenuCfg);
            let newMenuItems;
            if((!this.leftData && !this.rightData) || (this.leftData && this.rightData)) {
                newMenuItems = [
                    {
                        id: 'compare-left',
                        label: 'select as left for compare',
                        items: [],
                        data: {
                            postalInfo: 'COMPARE_CHANNEL#data.left',
                            params: geoData
                        }
                    }
                ];
            }
            else if(!this.rightData) {
                newMenuItems = [
                    {
                        id: 'compare-left',
                        label: 'select as left for compare',
                        items: [],
                        data: {
                            postalInfo: 'COMPARE_CHANNEL#data.left',
                            params: geoData
                        }
                    },
                    {
                        id: 'compare-right',
                        label: 'compare to left file',
                        items: [],
                        data: {
                            postalInfo: 'COMPARE_CHANNEL#data.right',
                            params: geoData
                        }
                    }
                ];
            }
            this.contextMenuCfg = _.concat(currentCfg, newMenuItems);
        }
    }

    getContextMenuItem(id: string): TreeItem {
        return _.find(this._flatenItems, item => item.id === id);
    }

    beforeFileUpload(uploadingFile) {
        let files = this._fileUpload.nativeElement.files;
        if (files.length) {
            const file = files[0];
        }
        jQuery('#upload-progress').css('display', 'block');
    }

    _onFileUpload(data) {
        if (data['done'] || data['abort'] || data['error']) {
            jQuery('#upload-progress').css('display', 'none');
            this._onFileUploadCompleted(data);
        } else {
            jQuery('#upload-progress').css('display', 'block');
            this.onFileUpload.emit(data);
            this.uploadProgress = data.progress.percent;
        }
    }

    _onFileUploadCompleted(data) {
        this.onFileUploadCompleted.emit(data);

        if (!data.abort && data.done && !data.error) {
            const response = JSON.parse(data.response);
            if (_.startsWith(_.get(response, 'status.code'), '200')) {
                this._notification.create(
                    'success',
                    'Info:',
                    'loading data succeed!'
                );
                postal
                    .channel('DATA_CHANNEL')
                    .publish('data.add', response.data);
            } else {
                this._notification.create(
                    'warning',
                    'Warning:',
                    'loading data failed, please retry later!'
                );
            }
        }
    }

    onDataToolClick(data) {
        // jQuery('#container li').removeClass('selected-li');
        this.selectedLi = data
        postal
            .channel('LAYOUT_CHANNEL')
            .publish('propertity-panel.data.show', this.selectedLi);
    }
}

