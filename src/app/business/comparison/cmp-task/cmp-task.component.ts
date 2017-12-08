import { Component, OnInit } from '@angular/core';

import { CmpTaskService } from '../services/cmp-task.service';

@Component({
  selector: 'ogms-cmp-task',
  templateUrl: './cmp-task.component.html',
  styleUrls: ['./cmp-task.component.scss']
})
export class CmpTaskComponent implements OnInit {

  constructor(private service: CmpTaskService) { }

  ngOnInit() {
  }

}
