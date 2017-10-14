import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

import { ModelToolService } from './services/model-tool.service';

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
    modelInput: any = null;

    constructor(
        private modelToolService: ModelToolService,
        private _notification: NzNotificationService
    ) {}

    ngOnInit() {
        postal
            .channel('LAYOUT_CHANNEL')
            .subscribe('invoke-panel.show', (data, envelope) => {
                this.toggleLayout();
                this.model = data;
                postal
                    .channel('MODEL_TOOL_CHANNEL')
                    .subscribe('getModelInput', (data, envelope) => {
                        this._InputLoading = false;
                        if (data.successed) {
                            this.modelInput = data.result;
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
        jQuery('#manager-card .ant-card-head').css('height', '38px');
        jQuery('#manager-card .ant-card-head').css('line-height', '38px');
        jQuery('#manager-card .ant-card-head').css('padding', '0 5px');
        jQuery('#manager-card .ant-card-head h3').css('font-size', '16px');
        jQuery('#manager-card .ant-card-body').css('padding', '5px');
        jQuery('#manager-card .ant-card-body').css('height', '100%');
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
                xs: 10,
                sm: 10,
                md: 10,
                lg: 10,
                xl: 10
            },
            {
                xs: 8,
                sm: 8,
                md: 9,
                lg: 9,
                xl: 9
            }
        ];
    }

    closePanel() {
        postal.channel('LAYOUT_CHANNEL').publish('invoke-panel.hide', {});
    }
}
