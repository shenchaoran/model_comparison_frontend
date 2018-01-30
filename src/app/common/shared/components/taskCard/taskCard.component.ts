import { Component, OnInit,Input } from '@angular/core';
import { Task } from "../../../../business/mock/task.model";

@Component({
  selector: 'task-card',
  templateUrl: './taskCard.component.html',
  styleUrls: ['./taskCard.component.scss']
})
export class TaskCardComponent {
  @Input() task: Task;

  constructor() { }

  ngOnInit() {
  }

}
