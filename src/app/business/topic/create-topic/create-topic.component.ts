import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopicService } from '@services';

@Component({
    selector: 'ogms-create-topic',
    templateUrl: './create-topic.component.html',
    styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {
    _title: string = 'Create a new research topic';
    _headerMeta: string = 'A comparison topic face to a specific geographic issue, and include several comparison solutions to solve this issue.';
    _submitText: string = 'Create topic';
    
    get topic() { return this.topicService.topic; }

    constructor(
        private topicService: TopicService,
        private router: Router,
    ) {
        this.topicService.create();
    }

    ngOnInit() {}

    onSubmit(e) {
        this.topic.auth.src = e.auth;
        this.topic.meta.name = e.name;
        this.topic.meta.desc = e.desc;
        this.topicService.upsert().subscribe(res => {
            if(!res.error) {
                this.router.navigate(['/topics', this.topic._id]);
            }
        });
    }

}
