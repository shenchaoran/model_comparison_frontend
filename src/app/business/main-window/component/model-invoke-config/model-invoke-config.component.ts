import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

import { ModelToolService } from '../../services/model-tool.service';

@Component({
    selector: 'app-model-invoke-config',
    templateUrl: './model-invoke-config.component.html',
    styleUrls: ['./model-invoke-config.component.scss']
})
export class ModelInvokeConfigComponent implements OnInit, AfterViewInit {
    @Input() modelInput;
    selectedEvent = null;
    dataOptions;
    selectedDataOptions;
    disabledExecuteBtn = true;
    constructor(
        private modelToolService: ModelToolService,
        private _notification: NzNotificationService
    ) {}

    ngOnInit() {}

    ngAfterViewInit() {
        jQuery('.ant-spin-container').css('height', '100%');
        jQuery('#invork-card .ant-card-head').css('height', '38px');
        jQuery('#invork-card .ant-card-head').css('line-height', '38px');
        jQuery('#invork-card .ant-card-head').css('padding', '0 5px');
        jQuery('#invork-card .ant-card-head h3').css('font-size', '16px');
        jQuery('#invork-card .ant-card-extra').css('right', '13px');
        jQuery('#invork-card .ant-card-extra').css('top', '13px');
        jQuery('#invork-card .ant-card-body').css('padding', '5px');
        jQuery('#invork-card .ant-card-body').css('flex', '1');
    }

    checkExecBtn() {
        let disabled = false;
        _.map(this.modelInput.states, state => {
            _.map(state.inputs, input => {
                if(input.selected === undefined || input.selected === null){
                    disabled = true;
                }
            });

            _.map(state.outputs, output => {
                if(output.filename === undefined || output.filename === null){
                    disabled = true;
                }
            });
        });
        this.disabledExecuteBtn = disabled;
    }
}
