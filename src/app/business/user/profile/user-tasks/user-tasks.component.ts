import { Task } from './../../../models/task.class';
import { OgmsBaseComponent } from './../../../../shared/components/ogms-base/ogms-base.component';
import { TaskService } from '@services';
import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'ogms-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss']
})
export class UserTasksComponent extends OgmsBaseComponent implements OnInit {
  get taskList(): Task[] {
    return this.service.taskList;
  }
  result_type="comparison";
  constructor(
    private service:TaskService,
  ) { 
    super();
  }

  ngOnInit() {
  }

}
