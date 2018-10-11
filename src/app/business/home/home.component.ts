import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
    MSRService,
    SlnService,
    TaskService,
    DatasetService,
    MSService,
} from '../services';

@Component({
    selector: 'ogms-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
    issueTitle = {
        label: 'Issues',
        url: '/issues'
    };
    issueList;
    
    slnTitle = {
        label: 'Comparating solutions',
        url: '/comparison'
    };
    slnList;
    
    taskTitle = {
        label: 'Results & Diagnostics',
        url: '/results/comparison'
    };
    taskList;
    
    modelTitle = {
        label: 'Models',
        url: '/models'
    };
    modelList;
    
    dataTitle = {
        label: 'Datasets',
        url: '/datasets'
    };
    dataList;

    constructor(
        private msrService: MSRService,
        private slnService: SlnService,
        private taskService: TaskService,
        private datasetService: DatasetService,
        private msService: MSService,
    ) { }

    ngOnInit() {
        this.modelList = this.msService.getTopK(6);
        this.dataList = this.datasetService.getTopK(6);
        this.slnList = this.slnService.getTopK(6);
        this.issueList = this.msService.getTopK(6);
        this.taskList = this.taskService.getTopK(6);
    }

    ngAfterViewInit() {
    }
}
