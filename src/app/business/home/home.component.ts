import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
    MSRService,
    SolutionService,
    TaskService,
    DatasetService,
    MSService,
    TopicService,
} from '../services';

// TODO universal
@Component({
    selector: 'ogms-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
    topicTitle = {
        label: 'Topics',
        url: '/topics'
    };
    topicList;
    
    slnTitle = {
        label: 'Comparison solutions',
        url: '/comparison/solutions'
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
        private topicService: TopicService,
        private solutionService: SolutionService,
        private taskService: TaskService,
        private datasetService: DatasetService,
        private msService: MSService,
    ) { }

    ngOnInit() {
        this.modelList = this.msService.getTopK(3);
        this.dataList = this.datasetService.getTopK(3);
        this.slnList = this.solutionService.getTopK(3);
        this.topicList = this.topicService.getTopK(3);
        this.taskList = this.taskService.getTopK(3);
    }

    ngAfterViewInit() {
    }
}
