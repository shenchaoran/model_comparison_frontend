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
    topicList: Topic[];
    topicCount: Number;

    constructor(
        public topicService: TopicService
    ) {}

    ngOnInit() {
        this.topicService.findAll().subscribe(res => {
            if(!res.error) {
                this.topicList = res.data.docs;
                this.topicCount = res.data.count;
            }
        })
    }

    onPageChange(e) {
        this.topicService.findAll({
            pageIndex: e.pageIndex,
            pageSize: e.pageSize
        }).subscribe(res => {
            if(!res.error) {
                this.topicList = res.data.docs;
                this.topicCount = res.data.count;
            }
        })
    }
}
