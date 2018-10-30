import { TopicService } from './../../../services/topic.service';
import { UserService } from '@services';
import { Component, OnInit, } from '@angular/core';
import { Topic } from '@models';

@Component({
  selector: 'ogms-user-topics',
  templateUrl: './user-topics.component.html',
  styleUrls: ['./user-topics.component.scss']
})
export class UserTopicsComponent implements OnInit {

  user_topics:any[];
  get topicList(): Topic[] {
    return this.topicService.user_topics;
  }

  constructor(
    private service:UserService,
    public topicService: TopicService,
    ) { }

  ngOnInit() {
    this.user_topics = this.service.getMockUserIssues();
  }

}
