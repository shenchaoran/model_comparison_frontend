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
    if(this.createdTopic===null){
      return this.subscribedTopic === null? null : this.subscribedTopic.splice(0,4);
    }
    return this.createdTopic.concat(this.subscribedTopic);
  }
  get createdTopic(): Topic[] {
    return this.topicService.user_createTopics;
  }
  get subscribedTopic(): Topic[] {
    return this.topicService.user_subscribedTopics;
  }
  constructor(
    private service:UserService,
    public topicService: TopicService,
    ) { }

  ngOnInit() {
    this.user_topics = this.service.getMockUserIssues();
  }

}
