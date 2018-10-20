import { UserService } from '@services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ogms-user-topics',
  templateUrl: './user-topics.component.html',
  styleUrls: ['./user-topics.component.scss']
})
export class UserTopicsComponent implements OnInit {

  user_topics:any[];
  constructor(private service:UserService) { }

  ngOnInit() {
    this.user_topics = this.service.getMockUserIssues();
  }

}
