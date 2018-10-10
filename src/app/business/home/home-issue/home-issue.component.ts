import { Component, OnInit } from '@angular/core';

import * as _ from "lodash";

import { MockService } from "../mock/mock.service";
import { Issue } from "../mock/issue.model";

@Component({
  selector: 'ogms-home-issue',
  templateUrl: './home-issue.component.html',
  styleUrls: ['./home-issue.component.scss']
})
export class HomeIssueComponent implements OnInit {
  issues: Issue[];

  constructor(private mockService: MockService) { 
    const allIssues = mockService.getIssue();
    const showIssues = _.take(allIssues, 7);
    this.issues = showIssues;
  }

  ngOnInit() {
  }

}
