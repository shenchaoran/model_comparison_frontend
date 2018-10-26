import { Component, OnInit } from '@angular/core';
import {
    TopicService,
    ConversationService
} from '../../services';
import {
    Topic,
} from '../../models';

@Component({
    selector: 'ogms-topic-list',
    templateUrl: './topic-list.component.html',
    styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
    get topicList(): Topic[] {
        return this.topicService.topicList;
    }
    get topicCount(): Number {
        return this.topicService.topicCount;
    }

    constructor(
        public topicService: TopicService
    ) {}

    ngOnInit() {
        this.topicService.findAll().subscribe(res => {})
    }

    onPageChange(e) {
        this.topicService.findAll();
    }
}
