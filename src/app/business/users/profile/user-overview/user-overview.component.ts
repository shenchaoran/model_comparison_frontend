import { UserService, TopicService, SolutionService, TaskService } from '@services';
import { Topic, Solution, Task } from '@models';
import { Component, OnInit } from '@angular/core';
import { take } from 'lodash';

@Component({
  selector: 'ogms-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit { 
  get topicList(): Topic[] {
      return take(this.topicService.user_topics, 4);
  }

  get slnList(): Solution[] {
    return take(this.slnService.user_solutions, 4);
  }

  get taskList():Task[]{
    return take(this.taskService.taskList,4);
  }


  constructor(
    private service: UserService,
    public topicService: TopicService,
    public slnService: SolutionService,
    public taskService: TaskService
  ) { }

  ngOnInit() { 
  }
}
