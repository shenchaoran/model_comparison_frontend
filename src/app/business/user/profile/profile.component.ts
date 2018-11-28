import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { User } from './../../models/user.class';
import { TaskService } from './../../services/task.service';
import { SolutionService } from './../../services/sln.service';
import { TopicService } from './../../services/topic.service';

import {
  Component,
  OnInit,
} from '@angular/core';
import { UserService } from '../../services';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'ogms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private router$: Subscription;
  user: User;
  username: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    public topicService: TopicService,
    public slnService: SolutionService,
    public taskServic: TaskService,
    private router: Router,
  ) {

  }


  ngOnInit() {
    const url_userName = this.activatedRoute.snapshot.paramMap.get('userName');
    if (url_userName) {
      this.username = url_userName;
    }

    this.userService.getUserInfo(this.username)
      .subscribe({
        next: res => {
          if (res.error) {
            history.go(-1);
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


  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    const name = this.activatedRoute.snapshot.paramMap.get('userName');
    
    if(name && name!=this.username){
      this.username = name;
      this.userService.getUserInfo(this.username)
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


}
