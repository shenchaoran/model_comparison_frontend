import { ErrorHandle } from './../../common/core/base/error-handle';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

import { ModelToolService } from './services/model-tool.service';
import { ModelInput } from './component/property-panel/modelInput';
import { PropertyPanelShowType } from './component/property-panel/property-panel-show-type';
import { DataListService } from './services/data-list.service';

@Component({
    selector: 'app-main-window',
    templateUrl: './main-window.component.html',
    styleUrls: ['./main-window.component.scss']
})
export class MainWindowComponent extends ErrorHandle implements OnInit, AfterViewInit {
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
    propertiesTitle = null;
    visualTitle = null;
    panelData: {
        type: PropertyPanelShowType,
        data: ModelInput
    } = null;

    constructor(
        private modelToolService: ModelToolService,
        private dataListService: DataListService,
        private _notification: NzNotificationService
    ) {
        super();
    }

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
            .subscribe('propertity-panel.model.show', (data, envelope) => {
                const propertyPanelData = data;
                this.propertiesTitle = data.ms_model.m_name;
                postal
                    .channel('MODEL_TOOL_CHANNEL')
                    .subscribe('getModelInput', (data, envelope) => {
                        this._InputLoading = false;
                        if (data.succeed) {
                            data.result.msid = propertyPanelData._id;
                            data.result.msname = propertyPanelData.ms_model.m_name;
                            this.panelData = {
                                type: PropertyPanelShowType.MODEL,
                                data: data.result
                            };
                            this.showPanel();
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
            .subscribe('propertity-panel.data.show', (data, envelope) => {
                const geodata = data;
                const filename = data.filename;
                this.dataListService.parseUDXProp(data._id)
                    .toPromise()
                    .then(response => {
                        if (_.startsWith(_.get(response, 'status.code'),'200')) {
                            const data = _.get(response, 'data');
                            _.set(data, 'geodata', geodata);
                            this.showPanel();
                            this.panelData = {
                                type: PropertyPanelShowType.DATA,
                                data: null
                            };
                            this.propertiesTitle = filename;
                            this._InputLoading = false;

                            postal
                                .channel('PROP_CHANNEL')
                                .publish('data-prop.bind', data);
                        } 
                        else {
                            this._notification.create(
                                'warning',
                                'Warning:',
                                'parse data properties failed, please retry later!'
                            );
                        }
                    })
                    .catch(this.handleError);
            });

        postal
            .channel('LAYOUT_CHANNEL')
            .subscribe('propertity-panel.hide', (data, envelope) => {
                jQuery('#propertity-panel').css('display', 'none');
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
        
        postal
            .channel('PROP_CHANNEL')
            .subscribe('compare-prop.bind', (data, envelope) => {
                this.panelData = {
                    type: PropertyPanelShowType.DATA_COMPARE,
                    data: undefined
                };
                this._InputLoading = false;
                this.propertiesTitle = `${data.left.filename} vs ${data.right.filename}`;
                
                this.showPanel();
            });

        postal
            .channel('LAYOUT_CHANNEL')
            .subscribe('visualization.title', (data, envelope) => {
                this.visualTitle = data;
            });
    }

    ngAfterViewInit() {
        jQuery('.nz-overlay-container').css('z-index', '5000');
        jQuery('#manager-card .ant-card-head').css({
            height: '38px',
            'line-height': '38px',
            padding: '0 5px'
        });
        jQuery('#manager-card .ant-card-head h3').css('line-height', '38px');
        let cardBodyH = parseInt(jQuery('nz-card').css('height')) - 38 + 'px';
        jQuery('#manager-card .ant-card-head h3').css('font-size', '16px');
        jQuery('#manager-card .ant-card-body').css({
            padding: '5px',
            height: cardBodyH
        });

        jQuery('#visual-card .ant-card-head').css({
            height: '38px',
            'line-height': '38px',
            padding: '0 5px'
        });
        jQuery('#visual-card .ant-card-head h3').css('line-height', '38px');
        cardBodyH = parseInt(jQuery('nz-card').css('height')) - 38 + 'px';
        jQuery('#visual-card .ant-card-head h3').css('font-size', '16px');
        jQuery('#visual-card .ant-card-body').css({
            padding: '5px',
            height: cardBodyH
        });

        jQuery('#invork-card .ant-card-head').css({
            height: '38px',
            'line-height': '38px',
            padding: '0 5px'
        });
        jQuery('#invork-card .ant-card-head h3').css('line-height', '38px');
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

    showPanel() {
        jQuery('#propertity-panel').css('display', 'block');
        this.nzSpans = [
            {
                xs: 4,
                sm: 4,
                md: 5,
                lg: 5,
                xl: 5
            },
            {
                xs: 7,
                sm: 7,
                md: 7,
                lg: 7,
                xl: 7
            },
            {
                xs: 13,
                sm: 13,
                md: 12,
                lg: 12,
                xl: 12
            }
        ];
    }

    hidePanel() {
        postal.channel('LAYOUT_CHANNEL').publish('propertity-panel.hide', {});
    }
}
