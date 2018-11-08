import { User } from './../../models/user.class';
import { TaskService } from './../../services/task.service';
import { SolutionService } from './../../services/sln.service';
import { TopicService } from './../../services/topic.service';

import {
  Component,
  OnInit, 
} from '@angular/core';
import { UserService } from '../../services';
import {  ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators'; 


@Component({
  selector: 'ogms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private router$: Subscription;
  user: User;
  userId: string;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    public topicService: TopicService,
    public slnService: SolutionService,
    public taskServic: TaskService,
  ) { }


  ngOnInit() {
    //TODO 获取 user 数据  不要直接从user中取，要从后台重新获取一遍
    this.userId = this.userService.user._id; 
    const url_userId = this.activatedRoute.snapshot.paramMap.get('id');
    if(url_userId&&url_userId!='user-overview'){
      this.userId = url_userId;
    }
    this.userService.getUserInfo(this.userId)
      .subscribe({
        next: res => {
          if (res.error) {
            alert(res.error.desc);
          } else {
            this.user = res.data.user;
            console.log(this.user);
           
            console.log("userid:" + this.user._id);
            this.topicService.findByUserId(this.user._id).subscribe(res => { });
            this.slnService.findByUserId(this.user._id).subscribe(res => { });
            this.taskServic.findByUserId(this.user._id).subscribe(res => { });
          }
        },
        error: e => {
          console.error(e);
        }
      });
  }
 
}
