import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
    MSRService,
    SolutionService,
    TaskService,
    DatasetService,
    MSService,
    TopicService,
} from '@services';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
        url: '/solutions'
    };
    slnList;
    
    taskTitle = {
        label: 'Results & Diagnostics',
        url: '/results'
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
        private topicService: TopicService,
        private solutionService: SolutionService,
        private taskService: TaskService,
        private datasetService: DatasetService,
        private msService: MSService,
    ) { }

    ngOnInit() {
        let fn = service => (service.getTopK(3) as Observable<any>).pipe(
            filter(res => !res.error),
            map(res => res.data)
        );
        this.modelList = fn(this.msService);
        this.dataList = fn(this.datasetService);
        this.slnList = fn(this.solutionService);
        this.topicList = fn(this.topicService);
        this.taskList = fn(this.taskService);
    }

    ngAfterViewInit() {
    }
}
