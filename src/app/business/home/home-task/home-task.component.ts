import { Component, OnInit } from '@angular/core';
import { MockService } from "../../mock/mock.service";
import { Task } from "../../mock/task-model";

@Component({
  selector: 'ogms-home-task',
  templateUrl: './home-task.component.html',
  styleUrls: ['./home-task.component.scss']
})
export class HomeTaskComponent implements OnInit {
  tasks: Task[];

  constructor(private mockService: MockService) { 
    this.tasks = mockService.getTask();
    console.log(this.tasks[0].modelName);
   }

  ngOnInit() {
  }

}
