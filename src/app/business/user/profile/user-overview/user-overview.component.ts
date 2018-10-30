import { Task } from './../../../models/task.class';
import { SolutionService, TaskService } from '@services';
import { Topic, Solution } from '@models';
import { TopicService } from './../../../services/topic.service';
import { UserService } from './../../../services/user.service';
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

  taskList: Task[];
  // slnList: Solution[];

  constructor(
    private service: UserService,
    public topicService: TopicService,
    public slnService: SolutionService,
    public taskService: TaskService
  ) { }

  ngOnInit() {
    this.taskService.getTopK(4).subscribe(response => {
      if (response.error) {
        return Promise.reject(response.error);
      } else {
        this.taskList = response.docs;
      }
    });

    // this.slnService.getTopK(4).subscribe(response => {
    //   if (response.error) {
    //     return Promise.reject(response.error);
    //   } else {
    //     console.log(response);
    //     this.slnList = response.docs;
    //   }
    // });
  }
}
