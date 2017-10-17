import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

import { ModelToolService } from './services/model-tool.service';
import { ModelInput } from './component/model-invoke-config/modelInput';

@Component({
    selector: 'app-main-window',
    templateUrl: './main-window.component.html',
    styleUrls: ['./main-window.component.scss']
})
export class MainWindowComponent implements OnInit, AfterViewInit {
    nzSpans: Array<any> = [
        {
            xs: 4,
            sm: 5,
            md: 5,
            lg: 5,
            xl: 5
        },
        {
            xs: 0,
            sm: 0,
            md: 0,
            lg: 0,
            xl: 0
        },
        {
            xs: 20,
            sm: 19,
            md: 19,
            lg: 19,
            xl: 19
        }
    ];
    _InputLoading: boolean = true;
    model;
    modelInput: ModelInput = null;

    constructor(
        private modelToolService: ModelToolService,
        private _notification: NzNotificationService
    ) {}

    ngOnInit() {
        window.document.onclick = (e) => {
            // console.log('menu.hide');
            postal.channel('MENU_CHANNEL').publish('menu.hide');
            // e.preventDefault();
            // e.stopPropagation();
            // e.cancelBubble = true;
        }

        postal
            .channel('LAYOUT_CHANNEL')
            .subscribe('invoke-panel.show', (data, envelope) => {
                this.model = data;
                postal
                    .channel('MODEL_TOOL_CHANNEL')
                    .subscribe('getModelInput', (data, envelope) => {
                        this._InputLoading = false;
                        if (data.successed) {
                            this.modelInput = data.result;
                            this.modelInput.msid = this.model._id;
                            this.modelInput.msname = this.model.ms_model.m_name;
                            this.toggleLayout();
                        } else {
                            this._notification.create(
                                'warning',
                                'Warning:',
                                'loading model input and output failed, please retry later!'
                            );
                        }
                    });
                this.modelToolService.getModelInput(
                    {
                        id: data._id
                    },
                    undefined,
                    undefined
                );
            });

        postal
            .channel('LAYOUT_CHANNEL')
            .subscribe('invoke-panel.hide', (data, envelope) => {
                jQuery('#invoke-panel').css('display', 'none');
                this.nzSpans = [
                    {
                        xs: 4,
                        sm: 5,
                        md: 5,
                        lg: 5,
                        xl: 5
                    },
                    {
                        xs: 0,
                        sm: 0,
                        md: 0,
                        lg: 0,
                        xl: 0
                    },
                    {
                        xs: 20,
                        sm: 19,
                        md: 19,
                        lg: 19,
                        xl: 19
                    }
                ];
            });
    }

    ngAfterViewInit() {
        jQuery('.nz-overlay-container').css('z-index', '5000');
        jQuery('#manager-card .ant-card-head').css({
            height: '38px',
            'line-height': '38px',
            padding: '0 5px'
        });
        const cardBodyH = parseInt(jQuery('nz-card').css('height')) - 38 + 'px';
        jQuery('#manager-card .ant-card-head h3').css('font-size', '16px');
        jQuery('#manager-card .ant-card-body').css({
            padding: '5px',
            height: cardBodyH
        });

        jQuery('#invork-card .ant-card-head').css({
            height: '38px',
            'line-height': '38px',
            padding: '0 5px'
        });
        jQuery('#invork-card .ant-card-head h3').css('font-size', '16px');
        jQuery('#invork-card .ant-card-extra').css({
            right: '13px',
            top: '13px'
        });
        jQuery('#invork-card .ant-card-body').css({
            padding: '5px',
            height: cardBodyH
        });
    }

    toggleLayout() {
        jQuery('#invoke-panel').css('display', 'block');
        this.nzSpans = [
            {
                xs: 4,
                sm: 4,
                md: 5,
                lg: 5,
                xl: 5
            },
            {
                xs: 8,
                sm: 8,
                md: 8,
                lg: 8,
                xl: 8
            },
            {
                xs: 12,
                sm: 12,
                md: 11,
                lg: 11,
                xl: 11
            }
        ];
    }

    closePanel() {
        postal.channel('LAYOUT_CHANNEL').publish('invoke-panel.hide', {});
    }
}
