import { Topic } from '@models';
import { TopicService } from './../../../services/topic.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ogms-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {
  user_topics:any[];
  get topicList(): Topic[] {
    return this.topicService.currentUser_topicList;
  }
  get topicCount(): Number {
    return this.topicService.currentUser_topicCount;
  }

  constructor(
    private service:UserService,
    public topicService: TopicService,
    ) { }

  ngOnInit() {
    this.user_topics = this.service.getMockUserIssues();
  }

}
