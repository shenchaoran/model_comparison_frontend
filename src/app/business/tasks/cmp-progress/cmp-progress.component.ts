import { Component, OnInit, Input, Output, EventEmitter, ElementRef, 
    AfterViewInit, OnDestroy, ViewChild, } from '@angular/core';
import { OGMSState } from '@models';
import * as uuidv1 from 'uuid/v1'
import { TaskService } from '@services';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'ogms-cmp-progress',
    templateUrl: './cmp-progress.component.html',
    styleUrls: ['./cmp-progress.component.scss']
})
export class CmpProgressComponent implements OnInit, AfterViewInit, OnDestroy {
    containerId
    @Input() data;
    @Input() taskId;
    @Input() cmpObjId;
    @ViewChild('gridTable') gridTableRef: ElementRef;
    
    constructor(
        private taskService: TaskService,
        private snackBar: MatSnackBar
    ) {
        this.containerId = uuidv1()
    }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }

    ngOnDestroy() {

    }
    
    onActionsChange(method, message) {
        let alertInfo,
            shouldAlert = false;
        if(method.state === OGMSState.FINISHED_SUCCEED) {
            if(message === 'start' || message === 'stop') {
                alertInfo = 'the comparison had finished!'
                shouldAlert = true;
            }
        }
        if(method.state === OGMSState.RUNNING) {
            if(message === 'start' || message === 'restart') {
                alertInfo = 'the comparison is running'
                shouldAlert = true;
            }
        }
        if(method.state === OGMSState.INIT || method.state === OGMSState.FINISHED_FAILED) {
            if(message === 'stop') {
                alertInfo = 'the task hasn\'t start!'
                shouldAlert = true;
            }
        }
        if(shouldAlert) {
            this.snackBar.open(alertInfo, '', { duration: 2000 })
        }
        else {
            method.state = OGMSState.PENDING;
            this.taskService.startOneCmpMethod(this.taskId, this.cmpObjId, method.id, message).subscribe(res => {
                if(!res.error) {
                    if(res.data) {
                        if(message === 'start' || message === 'restart') {
                            method.state = OGMSState.RUNNING
                        }
                        else if(message === 'stop') {
                            method.state = OGMSState.FINISHED_FAILED
                        }
                    }
                }
            })
        }
    }
}
