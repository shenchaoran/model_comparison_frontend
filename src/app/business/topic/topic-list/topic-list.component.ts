import { Router } from '@angular/router';
import { UserService } from '@services';
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
        public topicService: TopicService,
        public userService: UserService,
        private router: Router
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

    ceateTopic(){
        if(this.userService.isLogined){
            this.router.navigate(['/topics/create']);
        }else{
            this.userService.redirectIfNotLogined();
        } 
    }
}
