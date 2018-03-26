// 创建一个calculate instance
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { ResourceSrc, CalcuTask, CmpTask, CmpSolution } from '@models';
import { LoginService } from '@feature/login/login.service';

@Component({
    selector: 'ogms-calcu-cfg',
    templateUrl: './calcu-cfg.component.html',
    styleUrls: ['./calcu-cfg.component.scss']
})
export class CalcuCfgComponent implements OnInit, OnChanges {
    
    @Input() msInstance: any;
    @Output() onInstanceChange = new EventEmitter<any>();
    @Output() onValidationChange = new EventEmitter<any>();
    
    fileUploaderOptions: NgUploaderOptions;

    constructor(
        private loginService: LoginService,
    ) { 
        const token = this.loginService.getToken();
        const user = this.loginService.getUser();
        
        this.fileUploaderOptions = {
            url: '/data',
            data: {
                desc: '',
                src: ResourceSrc.EXTERNAL,
                userId: user._id
            },
            multiple: true,
            fieldName: 'geo-data',
            customHeaders: {
                Authorization:
                    'bearer ' + token
            }
        };
    }

    ngOnChanges (changes: {[key: string]: SimpleChange}) {
        let changed;
        _.forIn(changes, (v, k) => {
            if(!_.isEqual(v.currentValue, v.previousValue)) {
                changed = true;
            }
        });
        if(changed) {
            
        }
    }

    ngOnInit() {
    }

    onCoordinateChange(v, event) {
        const match = v.match(/\s*\[?\s*(\d+\.?(\d+)?)\s*,\s*(\d+\.?(\d+)?)\s*\]?\s*/);
        if(match) {
            if(match.length === 5) {
                event.value = [match[1], match[3]];
            }
            else {
                event.value = [];
            }
        }
    }

    onParamRadioChange(event, shouldUpdate, opt) {
        // if(shouldUpdate) {
            event.value = opt;
        // }
        this.onInstanceChange.emit(this.msInstance);
    }

    onParamCheckboxChange(event, shouldPush, opt) {
        if(!event.value) {
            event.value = [];
        }
        if(shouldPush) {
            if(_.indexOf(event.value, opt) === -1) {
                event.value.push(opt);
            }
        }
        else {
            _.remove(event.value, opt);
        }
        this.onInstanceChange.emit(this.msInstance);
    }

    onOutputChange(event, e) {
        if(e === '' || e === undefined || e === null) {
            event.value = 'off';
        }
        this.onInstanceChange.emit(this.msInstance);
    }

    onDateChange(event, e) {
        event.value = e.getTime();
        this.onInstanceChange.emit(this.msInstance);
    }

    _onFileUpload(e, msId, eventId) {}

    _onFileUploadCompleted(response, ms, event) {
        if(response.error) {

        }
        else {
            event.value = response.data._id;
        }
        this.onInstanceChange.emit(this.msInstance);
    }

    _onClearUploaded(ms, event) {
        event.value = undefined;
        this.onInstanceChange.emit(this.msInstance);
    }
}
