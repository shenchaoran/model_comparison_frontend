import { Component, OnInit } from '@angular/core';
import {
    TopicService,
    ConversationService
} from '../../services';
import {
    Topic,
} from '../../models';
import { DefaultLifeHook } from '../../../common/shared/classes';

@Component({
    selector: 'ogms-topic-list',
    templateUrl: './topic-list.component.html',
    styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent extends DefaultLifeHook implements OnInit {
    get topicList(): Topic[] {
        return this.topicService.topicList;
    }
    get topicCount(): Number {
        return this.topicService.topicCount;
    }

    constructor(
        public topicService: TopicService
    ) {
        super(topicService);
    }

    ngOnInit() {
        this.topicService.findAll().subscribe(res => {})
    }

    onPageChange(e) {
        this.topicService.findAll();
    }
}
