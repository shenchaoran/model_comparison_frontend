import { Component, OnInit,Input } from '@angular/core';
import { Task } from "../../mock/task-model";

@Component({
  selector: 'ogms-home-task-card',
  templateUrl: './home-task-card.component.html',
  styleUrls: ['./home-task-card.component.scss']
})
export class HomeTaskCardComponent {
  @Input() task: Task;

  constructor() { }

  ngOnInit() {
  }

}
