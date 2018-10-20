import { UserService } from '@services';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';


@Component({
  selector: 'ogms-user-issues',
  templateUrl: './user-issues.component.html',
  styleUrls: ['./user-issues.component.scss']
})
export class UserIssuesComponent implements OnInit {
  list: any[];
  constructor(private service:UserService) { }

  ngOnInit() {
    this.list = this.service.getMockUserIssues();
    console.log(this.list);
  }

}
