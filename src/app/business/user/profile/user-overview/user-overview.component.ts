import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ogms-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {

  user_topics:any[];
  constructor(private service:UserService) { }

  ngOnInit() {
    this.user_topics = this.service.getMockUserIssues();
  }

}
