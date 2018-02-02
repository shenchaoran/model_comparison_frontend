import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ogms-cmp-issue-list',
  templateUrl: './cmp-issue-list.component.html',
  styleUrls: ['./cmp-issue-list.component.scss']
})
export class CmpIssueListComponent implements OnInit {
    issues: any[];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.data.subscribe(resolveData => {
        this.issues = resolveData.issues;
      });
  }

}
