import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopicService, ConversationService } from '@services';
import { Topic } from '@models';

@Component({
    selector: 'ogms-create-topic',
    templateUrl: './create-topic.component.html',
    styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {
    _title: string = 'Create a new research topic';
    _headerMeta: string = 'A comparison topic face to a specific geographic issue, and include several comparison solutions to solve this issue.';
    _submitText: string = 'Create topic';
    topic: Topic;

    constructor(
        private topicService: TopicService,
        private router: Router,
        private conversationService: ConversationService,
    ) {
        this.topic = this.topicService.create();
    }

    ngOnInit() {}

    onSubmit(e) {
        this.topic.auth.src = e.auth;
        this.topic.meta.name = e.name;
        this.topic.meta.desc = e.desc;
        this.topicService.insert({
            topic: this.topic,
            conversation: this.conversationService.conversation
        }).subscribe(res => {
            if(!res.error) {
                this.router.navigate(['/topics', this.topic._id]);
            }
        });
    }

}
